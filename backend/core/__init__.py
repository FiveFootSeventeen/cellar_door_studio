from pyramid.events import NewRequest
from pyramid.config import Configurator

import sqlalchemy
import zope.sqlalchemy

from .models.simple import DBSession, Base

def get_engine(settings, prefix="sqlalchemy."):
    engine = sqlalchemy.engine_from_config(settings, prefix)
    return engine

def get_session_factory(engine):
    factory = sqlalchemy.orm.sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on wheter an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

        import transaction

        engine = get_engine(settings)
        session_vactory = get_session_factory(engine)
        with transaction.manager:
            dbsession = get_tm_session(session_factory, transaction.manager)
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def add_restricted_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': 'https://ancient-scrolls.com',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)


def add_open_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)


def default_options_response(request):
    return {}


def delete_result_from_index(request):
    file = request.matchdict['file']
    index = ResultIndex(rootdir)
    return index.DeleteResult(file)


def add_root_route(config, route, method):
    config.add_route(name=route, pattern=f"/{route}", request_method=method )
    config.add_route(name=f"{route}_options", pattern=f"/{route}", request_method='OPTIONS')
    config.add_view(delete_result_from_index, route_name=route, renderer='json')
    config.add_view(default_options_response, route_name=f"{route}_options", renderer='json')


def main(global_config, **settings):
    config = Configurator(settings=settings, root_factory='core.models.simple.Root')

    enable_cors = settings.get('enable_cors', False) == "True"

    # Enable Open Cross Origin Requests only in development
    if enable_cors == True:
        print("--------------------------- Enabling Open CORS ---------------------------")
        config.add_subscriber(add_open_cors_headers_response_callback, NewRequest)
    else:
        config.add_subscriber(add_restricted_cors_headers_response_callback, NewRequest)


    #config.include(".models")

    add_root_route(config, "item", "GET")
    add_root_route(config, "story_group", "GET")
    add_root_route(config, "mint_story", "POST")
    add_root_route(config, "trash_story", "POST")

    config.scan('.story')

    session_factory= get_session_factory(get_engine(settings))
    config.registry["dbsession_factory"] = session_factory

    # make request.dbsession available for use in pyramid
    config.add_request_method(
        # r.tm is the transaction manager used by pyramid_tm
        lambda r: get_tm_session(r.registry["dbsession_factory"], r.tm),
        "dbsession",
        reify=True,
    )

    return config.make_wsgi_app()
