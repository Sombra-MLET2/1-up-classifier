import logging
from sqlalchemy.orm import Session, Query
from api.dtos import MushroomDTO, MushroomSearchRequest
from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, VeilTypeEnum, HabitatEnum, \
    GillAttachmentEnum, SeasonEnum
from api.models.mushroom import Mushroom
from api.utils import map_dto_to_mushroom, prepare_enum
import pandas as pd


def save(db_con: Session, dto: MushroomDTO):
    logging.info(dto)
    mushroom = map_dto_to_mushroom(dto)
    logging.info(mushroom)
    db_con.add(mushroom)
    db_con.commit()


def df_find_mushrooms_by_id(db_con: Session, id: int) -> pd.DataFrame:
    query = db_con.query(Mushroom).statement.where(Mushroom.id == id)
    return pd.read_sql(query, db_con.bind)


def df_find_all_mushrooms(db_con: Session) -> pd.DataFrame:
    query = db_con.query(Mushroom).statement.order_by(Mushroom.id)
    return pd.read_sql(query, db_con.bind)


def find_mushrooms(db_con: Session, params: MushroomSearchRequest, page, size):
    query = db_con.query(Mushroom)

    if params.mushroom_class:
        query = query.where(Mushroom.mushroom_class == prepare_enum(ClassEnum, params.mushroom_class))
    if params.cap_shape:
        query = query.where(Mushroom.cap_shape == prepare_enum(CapShapeEnum, params.cap_shape))
    if params.cap_surface:
        query = query.where(Mushroom.cap_surface == prepare_enum(CapSurfaceEnum, params.cap_surface))
    if params.cap_color:
        query = query.where(Mushroom.cap_color == prepare_enum(CapColorEnum, params.cap_color))
    if params.veil:
        query = query.where(Mushroom.veil_type == prepare_enum(VeilTypeEnum, params.veil))
    if params.habitat:
        query = query.where(Mushroom.habitat == prepare_enum(HabitatEnum, params.habitat))
    if params.gill:
        query = query.where(Mushroom.gill_attachment == prepare_enum(GillAttachmentEnum, params.gill))
    if params.season:
        query = query.where(Mushroom.season == prepare_enum(SeasonEnum, params.season))

    return query.order_by(Mushroom.created_at).offset(page).limit(size)


def find_mushrooms_by_id(db_con: Session, id: int):
    return db_con.query(Mushroom).where(Mushroom.id == id).all()


def find_mushrooms_all(db_con: Session):
    return db_con.query(Mushroom).order_by(Mushroom.id).all()


def save_mushrooms(db_con: Session, mushrooms: list[Mushroom]):
    db_con.add_all(mushrooms)
    db_con.commit()


def delete_uci_mushrooms(db_con: Session) -> int:
    deleted = db_con.query(Mushroom).filter(Mushroom.user == 'uci_import').delete()
    db_con.commit()

    return deleted


def delete_mushrooms_by_ids(db_con: Session, ids: list[int]) -> int:
    deleted = db_con.query(Mushroom).filter(Mushroom.id.in_(ids)).delete(synchronize_session=False)
    db_con.commit()

    return deleted
