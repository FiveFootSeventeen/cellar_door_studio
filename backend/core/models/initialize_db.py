import os
import sys
import transaction

from sqlalchemy import engine_from_config
from datetime import datetime as dt

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)

from .simple import (
    DBSession,
    Base,
)

from .character import (
    Character,
)


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)

    pool_start = dt.strptime("2022-09-22, 21:45", "%Y-%m-%d, %H:%M")
    diff = dt.now() - pool_start
    total_epochs = diff.days // 5

    me = Character(
        stake_key="stake1u8tsas9gvvvkz9m8d2rqd006vqw83rx39hhyvhha4qz6p5syl77c7",
        first_staked=pool_start,
        last_staked=dt.now(),
        lifetime_stake=-1,
        num_epoch_staked=total_epochs,
        num_consecutive_epochs=total_epochs,
        character_name="Anodos",
        profile_img_path=""
    )


#    DBSession.add_all([user1, user2])
    DBSession.add_all([me])
    transaction.commit()


