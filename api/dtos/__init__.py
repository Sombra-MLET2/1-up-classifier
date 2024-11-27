from typing import Optional

from pydantic import BaseModel, Field, EmailStr, PositiveInt

from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum

# Mushrooms
class MushroomDTO(BaseModel):
    id: int | None = None
    mushroom_class: Optional[ClassEnum] = None
    cap_diameter: float
    cap_shape: Optional[CapShapeEnum] = None
    cap_surface: Optional[CapSurfaceEnum] = None
    cap_color: Optional[CapColorEnum] = None
    does_bruise_bleed: Optional[DoesBruiseBleedEnum] = None
    gill_attachment: Optional[GillAttachmentEnum] = None
    gill_spacing: Optional[GillSpacingEnum] = None
    gill_color: Optional[CapColorEnum] = None
    stem_height: float
    stem_width: float
    stem_root: Optional[StemRootEnum] = None
    stem_surface: Optional[CapSurfaceEnum] = None
    stem_color: Optional[CapColorEnum] = None
    veil_type: Optional[VeilTypeEnum] = None
    veil_color: Optional[CapColorEnum] = None
    has_ring: Optional[DoesBruiseBleedEnum] = None
    ring_type: Optional[RingTypeEnum] = None
    spore_print_color: Optional[CapColorEnum] = None
    habitat: Optional[HabitatEnum] = None
    season: Optional[SeasonEnum] = None
    user: Optional[str] = Field(None, max_length=50)

    class Config:
        use_enum_values = True
        from_attributes = True


class MushroomDeleteRequest(BaseModel):
    ids: list[int]


class MushroomPageResponse(BaseModel):
    total: int
    page: int
    data: list[MushroomDTO]

class MushroomSimpleResponse(BaseModel):
    message: str | None = None

class MushroomSearchRequest(BaseModel):
    mushroom_class: Optional[str] = None
    cap_shape: Optional[str] = None
    cap_surface: Optional[str] = None
    veil: Optional[str] = None
    habitat: Optional[str] = None
    cap_color: Optional[str] = None
    gill: Optional[str] = None
    season: Optional[str] = None

# Datasets
class DatasetResponse(BaseModel):
    message: str | None = None

# Sessions
class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    id: PositiveInt | None = Field(None, gt=0)
    email: EmailStr | None = None
    password: str | None = None
    hashed_password: str | None = None
    is_active: bool | None = True

class TokenData(BaseModel):
    email: str