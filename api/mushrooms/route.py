from typing import List

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse, Response

from api.dtos import MushroomDTO, MushroomDeleteRequest
from api.infra.database import get_db
from api.mushrooms.create_mushroom import save_mushroom
from api.mushrooms.delete_mushrooms import delete_mushrooms
from api.mushrooms.list_mushrooms import list_all_mushrooms

mushrooms_router = APIRouter(
    prefix="/mushrooms",
    tags=["mushrooms"],
    responses={401: {"description": "Invalid credentials"},
               404: {"description": "Not found"},
               500: {"description": "Internal server error"}},
)


@mushrooms_router.get("/")
async def list_mushrooms(db_con: Session = Depends(get_db)):
    mushrooms = list_all_mushrooms(db_con)

    if not mushrooms:
        return Response(status_code=204, content=None)

    return JSONResponse(status_code=200, content={
        'total': len(mushrooms),
        'page': 1,
        'data': _serialize_mushrooms(mushrooms)
    })



@mushrooms_router.post("/")
async def create_mushroom(dto: MushroomDTO, db_con: Session = Depends(get_db)):
    save_mushroom(
        db_con,
        dto)
    return JSONResponse(
        status_code=201,
        content={"message": "Mushroom created successfully"}
    )


@mushrooms_router.delete("/")
async def delete_mushroom(request: MushroomDeleteRequest, user: str = "abc", db_con: Session = Depends(get_db)):
    deleted = delete_mushrooms(db_con, user, request)

    return JSONResponse(
        status_code=200,
        content={"message": f"Deleted {deleted} records from UCI datasource"})


def _serialize_mushrooms(mushrooms: List[MushroomDTO]) -> List[dict]:
    return [mushroom.__dict__ for mushroom in mushrooms]