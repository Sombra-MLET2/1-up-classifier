import logging

from sqlalchemy.orm import Session

from api.dtos import MushroomDTO
from api.models.mushroom import Mushroom
from api.utils import map_dto_to_mushroom


def save(db_con: Session, dto: MushroomDTO):
    logging.info(dto)
    mushroom = map_dto_to_mushroom(dto)
    logging.info(mushroom)
    db_con.add(mushroom)
    db_con.commit()


def find_mushrooms(db_con: Session):
    return db_con.query(Mushroom).order_by(
        Mushroom.created_at).all()


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