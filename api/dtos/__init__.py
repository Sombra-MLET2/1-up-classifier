from typing import Optional

from pydantic import BaseModel, Field

from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum


class MushroomDTO(BaseModel):
    id: int
    mushroom_class: ClassEnum
    cap_diameter: float
    cap_shape: CapShapeEnum
    cap_surface: CapSurfaceEnum
    cap_color: CapColorEnum
    does_bruise_bleed: DoesBruiseBleedEnum
    gill_attachment: Optional[GillAttachmentEnum] = None
    gill_spacing: Optional[GillSpacingEnum] = None
    gill_color: Optional[CapColorEnum] = None
    stem_height: float
    stem_width: float
    stem_root: Optional[StemRootEnum] = None
    stem_surface: Optional[CapSurfaceEnum] = None
    stem_color: Optional[CapColorEnum] = None
    veil_type: VeilTypeEnum
    veil_color: Optional[CapColorEnum] = None
    has_ring: DoesBruiseBleedEnum
    ring_type: Optional[RingTypeEnum] = None
    spore_print_color: Optional[CapColorEnum] = None
    habitat: HabitatEnum
    season: SeasonEnum
    user: Optional[str] = Field(None, max_length=50)

    class Config:
        use_enum_values = True