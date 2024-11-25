from sqlalchemy.orm import Session

from api.infra.loggers import logger
from api.repositories.mushroom_repository import delete_uci_mushrooms


async def delete_uci_data(db_con: Session):
    deleted = delete_uci_mushrooms(db_con)
    logger.info(f"Deleted {deleted} rows imported from the UCI datasource")

    return deleted