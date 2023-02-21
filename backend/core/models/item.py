import enum

from sqlalchemy import (
    DateTime,
    Column,
    Integer,
    String,
    Enum,
    Float,
    Boolean
)

from sqlalchemy.sql import func
from sqlalchemy.dialects.sqlite import ARRAY
from sqlalchemy.orm import relationship

from .meta import Base

class ItemType(enum.Enum):
    cup = 1
    bowl = 2
    plate = 3
    tea_ware = 4


class Artist(Base):
    __tablename__ = 'artist'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    artist = Column(String(64), nullable=False)


class ItemSubInfo(Base):
    __tablename__ = 'item_sub_info'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False)
    height_in = Column(Float, nullable=False)
    diameter_in = Column(Float, nullable=False)
    weight_oz = Column(Float, nullable=False)


class Item(Base):
    __tablename__ = 'item'
    product_id = Column(String(16), primary_key=True, nullable=False)
    name = Column(String(128), nullable=False)
    artist = Column(Artist, nullable=False)
    date_added = Column(DateTime, nullable=False, server_default=func.now())
    item_type = Column(ARRAY(Enum(ItemType)), nullable=False)
    price = Column(Float, nullable=False)
    main_img = Column(String(256), nullable=False)
    alt_img = Column(String(256), nullable=False)
    additional_img_lst = Column(ARRAY(String(256)), nullable=False)
    sold = Column(Boolean, nullable=False, default=False)
    description = Column(String(2 ** 13), nullable=False)
    glaze_description = Column(ARRAY(String(128)), nullable=False)

    sub_info_ = relationship("ItemSubInfo")
