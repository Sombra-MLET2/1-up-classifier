from sqlalchemy.orm import Session

from api.dtos import User
from api.infra.loggers import logger
from api.repositories.mushroom_repository import delete_uci_mushrooms


async def delete_uci_data(db_con: Session, user: User):
    deleted = delete_uci_mushrooms(db_con)
    logger.info(f"User {user.email} deleted {deleted} rows imported from the UCI datasource")

    return deleted