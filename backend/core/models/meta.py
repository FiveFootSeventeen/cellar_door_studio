import sqlalchemy

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

# Recommended naming convention used by Alembic, as various different database
# providers will autogenerate vastly different names making migrations more
# difficult. See: http://alembic.zzzcomputing.com/en/latest/naming.html
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    # see https://github.com/sqlalchemy/sqlalchemy/issues/4784
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)
DeclarativeBase = declarative_base(metadata=metadata)

class Base(DeclarativeBase):
    __abstract__ = True

    @classmethod
    def get_or_create(cls, dbsession, defaults=None, **kwargs):
        """Helper for looking up or creating a dataabse entry atomically

        A common database pattern is to query for a row or add a row if it
        didn't exist. To do this atomically from seperate database sessions
        requires careful coordination fro the database. The "winner" should
        result in an INSERT that will eventually COMMIT successfully. The
        "loser" should rollback the INSERT and re-query for the new row.

        This method assumes to preconditions:
        1. The fields used for lookup (kwargs) are defined as UNIQUE in the 
           database schema. An IntegrityError is used to rollback the "loser".
        2. A FLUSH will cause the database to serialize the two transactions
           based on the UNIQUE constraint. The "loser" FLUSH should be queued
           until the "winner" transaction performs a COMMIT (or ROLLBACK).
           Both MySQL and SQLite meet this requirement

        Based loosely on the idea of Django get_or_create
        https://docs.djangoproject.com/el/1.11/ref/models/querysets/#get-or-create

        Returns a tuple with the item and an indication if it existed.
        Existed: (item, True)
        Created: (item, False)
        """
        # The savepoint must come before th einitial query for sqlalchemy to
        # bust its cache and re-query in the "loser" case. Using the savepoint
        # context manager (bein_nested) ensures the savepoint is cleaned up.
        # The only way to perform a rollback using a savepoint-context-manager
        # is to leave the context via an exception.
        #
        # The pyramid_tm transaction manager is bypassed since this critical
        # section only involves the provided DB session and this implementation
        # is more portable for other scripts and test code.
        class _NeedRequery(Exception):
            pass

        try:
            with dbsession.begin_nested():
                item = dbsession.query(cls).filter_by(**kwargs).one_or_none()
                if item is None:
                    if defaults is not None:
                        kwargs.update(defaults)
                    item = cls(**kwargs)
                    try:
                        dbsession.add(item)
                        dbsession.flush()
                    except sqlalchemy.exc.IntegrityError as ex:
                        raise _NeedRequery from ex
                    # The "winner" inserts the new row
                    return item, False
        except _NeedRequery:
            # The "loser" re-queries for the new row
            item = dbsession.query(cls).filter_by(**kwargs).one()
        return item, True

