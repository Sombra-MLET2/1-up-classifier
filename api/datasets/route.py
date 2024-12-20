import logging
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from api.datasets.delete_uci_data import delete_uci_data
from api.datasets.import_from_uci import import_from_uci
from api.dtos import DatasetResponse, User
from api.infra.database import get_db
from api.infra.security import get_current_active_user

datasets_router = APIRouter(
    prefix="/datasets",
    tags=["dataset"],
    responses={401: {"description": "Invalid credentials"},
               404: {"description": "Not found"},
               500: {"description": "Internal server error"}},
)


logger = logging.getLogger(__name__)


@datasets_router.post("/import",
                      summary="Import data from UCI dataset",
                      description="Data from UCI Mushroom dataset is imported as initial state by a special user named uci_import",
                      response_model=DatasetResponse)
async def import_uci_mushrooms(current_user: Annotated[User, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    inserted = await import_from_uci(db, current_user)

    return JSONResponse(
        status_code=201,
        content={"message": f"Imported {inserted} records from UCI datasource"})

@datasets_router.delete("/import",
                      summary="Delete data created from UCI dataset",
                      description="Data imported from UCI Mushroom dataset is deleted if its user is named uci_import",
                      response_model=DatasetResponse)
async def delete_uci_mushrooms(current_user: Annotated[User, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    inserted = await delete_uci_data(db, current_user)

    return JSONResponse(
        status_code=200,
        content={"message": f"Deleted {inserted} records from UCI datasource"})