from sqlalchemy.orm import Session

from api.dtos import MushroomDTO
from api.repositories.mushroom_repository import find_mushrooms


def list_all_mushrooms(db_con: Session) -> list[MushroomDTO]:
    mushrooms = find_mushrooms(db_con)

    dtos = []
    for mushroom in mushrooms:
        dto = MushroomDTO.from_orm(mushroom)
        dtos.append(dto)

    return dtos


