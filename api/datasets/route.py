import logging

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from api.datasets.delete_uci_data import delete_uci_data
from api.datasets.import_from_uci import import_from_uci
from api.infra.database import get_db

datasets_router = APIRouter(
    prefix="/datasets",
    tags=["dataset"],
    responses={401: {"description": "Invalid credentials"},
               404: {"description": "Not found"},
               500: {"description": "Internal server error"}},
)


logger = logging.getLogger(__name__)


@datasets_router.post("/import")
async def import_uci_mushrooms(db: Session = Depends(get_db)):
    inserted = await import_from_uci(db)

    return JSONResponse(
        status_code=201,
        content={"message": f"Imported {inserted} records from UCI datasource"})

@datasets_router.delete("/import")
async def delete_uci_mushrooms(db: Session = Depends(get_db)):
    inserted = await delete_uci_data(db)

    return JSONResponse(
        status_code=200,
        content={"message": f"Deleted {inserted} records from UCI datasource"})