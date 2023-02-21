from setuptools import setup

# List of dependencies installed via `pip install -e .`
# by virtue of the Setuptools `install_requires` value below.
requires = [
    "pyramid == 2.0",
    "gunicorn == 20.1.0",
    "pyramid-tm == 2.5",
    "SQLAlchemy == 1.4.42",
    "zope.sqlalchemy == 1.6",
    "numpy==1.23.5",
    "pysftp==0.2.9",
    "matplotlib==3.6.2",
    "titlecase==2.4",
    "blend_modes",
    "shapely==1.8.5",
    "colorthief==0.2.1",
    "geopandas==0.12.1",
    "scipy==1.9.3",
    "num2words==0.5.12",
    "google-auth==2.16.0",
    "google-auth-oauthlib==1.0.0",
    "google-auth-httplib2==0.1.0",
    "google-api-python-client==2.78.0"
]

# List of dependencies installed via `pip install -e ".[dev]"`
# by virtue of the Setuptools `extras_require` value in the Python
# dictionary below.
dev_requires = [
    'pyramid_debugtoolbar',
]

setup(
    name='core',
    install_requires=requires,
    extras_require={
        'dev': dev_requires,
    },
    entry_points={
        'paste.app_factory': [
            'main = core:main'
        ],
        'console_scripts': [
            'initialize_core_db = core.models.initialize_db:main'
        ],
    },
)

