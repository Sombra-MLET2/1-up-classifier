import logging

from fastapi import HTTPException
from sqlalchemy.orm import Session
from ucimlrepo import fetch_ucirepo

from api.datasets.delete_uci_data import delete_uci_data
from api.dtos import User
from api.infra.loggers import logger
from api.repositories.mushroom_repository import save_mushrooms
from api.utils import map_row_to_mushroom


async def import_from_uci(db_con: Session, user: User) -> int:
    await delete_uci_data(db_con, user)

    secondary_mushroom = fetch_ucirepo(id=848)

    X = secondary_mushroom.data.features
    y = secondary_mushroom.data.targets

    logger.info(f"User {user.email} is importing {X.shape[0]} records from UCI repository with {X.shape[1]} features...")

    try:
        mushrooms = []

        for index, row in X.iterrows():
            try:
                mushrooms.append(map_row_to_mushroom(row, y.iloc[index]['class']))
            except Exception as e:
                logger.error(f"Mapping failed for record id {index}: {e}")

        save_mushrooms(db_con, mushrooms)

        inserted = len(mushrooms)

        logging.info(f"Inserted {inserted} records into the mushrooms table from UCI repository")

        return inserted
    except Exception as e:
        db_con.rollback()

        logger.error(f"Failed to import data from UCI repository: {e}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while importing data from UCI repository")
