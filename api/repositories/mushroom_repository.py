import logging

from sqlalchemy.orm import Session

from api.models.mushroom import Mushroom


def save(db_con: Session, mushroom: Mushroom):
    logging.info(f"{mushroom}")


def save_mushrooms(db_con: Session, mushrooms: list[Mushroom]):
    db_con.add_all(mushrooms)
    db_con.commit()


def delete_uci_mushrooms(db_con: Session) -> int:
    deleted = db_con.query(Mushroom).filter(Mushroom.user == 'uci_import').delete()
    db_con.commit()

    return deleted