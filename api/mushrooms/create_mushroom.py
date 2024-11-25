from sqlalchemy.orm import Session

from api.dtos import MushroomDTO
from api.infra.loggers import logger
from api.repositories.mushroom_repository import save_mushrooms, save


def save_mushroom(db_con: Session, dto: MushroomDTO):
    logger.info(f"Received create mushroom request from user '{dto.user}': {dto.mushroom_class}")
    save(db_con, dto)
