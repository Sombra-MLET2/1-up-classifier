from random import Random
from typing import List, Union, Annotated
from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
from api.dtos import MushroomDTO, MushroomDeleteRequest, MushroomPageResponse, MushroomSimpleResponse, User, \
    MushroomSearchRequest
from api.infra.database import get_db
from api.infra.security import get_current_active_user
from api.mushrooms.create_mushroom import save_mushroom
from api.mushrooms.delete_mushrooms import delete_mushrooms
from api.mushrooms.list_mushrooms import list_all_mushrooms
from api.mushrooms.predict_mushroom import predict_mushroom_by_id, predict_mushroom_all
from api.mushrooms.predict_mushroom import predict_mushroom_by_id
from api.utils import map_dto_to_df
from api.mushrooms.predict_mushroom import predict as predict_mushroom

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
async def list_mushrooms(params: MushroomSearchRequest = Depends(), db_con: Session = Depends(get_db)):
    mushrooms = list_all_mushrooms(db_con, params)

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


@mushrooms_router.post(path="/predict", summary="predict")
async def predict(mushroom_id: int, db_con: Session = Depends(get_db)):
    try:
        return predict_mushroom_by_id(db_con, mushroom_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction has failed: {str(e)}")


@mushrooms_router.post(path="/predict-all", summary="predict all")
async def predict_all(db_con: Session = Depends(get_db)):
    try:
        return predict_mushroom_all(db_con)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction has failed: {str(e)}")


@mushrooms_router.post(path="/mock-predict", summary="Remove later")
async def mock_predict(dto: MushroomDTO):
    print(f'Received mushroom to predict: {dto}')

    mush_df = map_dto_to_df([dto])
    print(f'Mapped mushroom to predict: \n{mush_df.columns}\n{mush_df.values}')

    return predict_mushroom(mush_df)