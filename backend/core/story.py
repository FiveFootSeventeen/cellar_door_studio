import json
import os
import random
import base64
import shutil
import hashlib
import numpy as np

from multiprocessing import Process
from pathlib import Path
from pyramid.response import Response
from pyramid.view import view_config


current_story_dir = "story_group_6"
story_group_dir = Path("core", "character", "story_group", current_story_dir)

@view_config(route_name='item', request_method='GET')
def get_items(request):
    jake_q = request.dbsession.query(UserChooser).filter(UserChooser.name=="jake").one()

    res = Response(
        content_type='application/json',
        json={"test": "val"}
    )

    return res





