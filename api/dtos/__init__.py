from typing import Optional

from pydantic import BaseModel, Field

from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum


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