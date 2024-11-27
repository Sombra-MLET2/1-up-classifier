from typing import List, Union, Annotated

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse, Response

from api.dtos import MushroomDTO, MushroomDeleteRequest, MushroomPageResponse, MushroomSimpleResponse, User
from api.infra.database import get_db
from api.infra.security import get_current_active_user
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


@mushrooms_router.get("/",
                      summary="List all mushrooms",
                      response_model=Union[MushroomPageResponse])
async def list_mushrooms(db_con: Session = Depends(get_db)):
    mushrooms = list_all_mushrooms(db_con)

    if not mushrooms:
        return MushroomPageResponse(
            total=0,
            page=1,
            data=[])

    page = MushroomPageResponse(
        total=len(mushrooms),
        page=1,
        data=mushrooms)

    return page


@mushrooms_router.post("/",
                       summary="Create a mushroom based on user input",
                       response_model=MushroomSimpleResponse)
async def create_mushroom(dto: MushroomDTO, current_user: Annotated[User, Depends(get_current_active_user)],
                          db_con: Session = Depends(get_db)):
    dto.user = current_user.email

    save_mushroom(
        db_con,
        dto)
    return JSONResponse(
        status_code=201,
        content={"message": "Mushroom created successfully"}
    )


@mushrooms_router.delete("/",
                         summary="Delete one or more mushrooms based on the ids provided",
                         response_model=MushroomSimpleResponse)
async def delete_mushroom(request: MushroomDeleteRequest, user: str = "abc", db_con: Session = Depends(get_db)):
    deleted = delete_mushrooms(db_con, user, request)

    return JSONResponse(
        status_code=200,
        content={"message": f"Deleted {deleted} records from UCI datasource"})


def _serialize_mushrooms(mushrooms: List[MushroomDTO]) -> List[dict]:
    return [mushroom.__dict__ for mushroom in mushrooms]
