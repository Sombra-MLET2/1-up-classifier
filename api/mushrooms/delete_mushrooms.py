from sqlalchemy.orm import Session

from api.dtos import MushroomDeleteRequest
from api.infra.loggers import logger
from api.repositories.mushroom_repository import delete_mushrooms_by_ids


def delete_mushrooms(db_con: Session, user: str, request: MushroomDeleteRequest) -> int:
    ids = request.ids
    logger.warn(f"{user} is deleting mushroom(s) by id(s): {ids}")
    return delete_mushrooms_by_ids(db_con, ids)
