from sqlalchemy import Column, Integer, Enum, Float, String, DateTime, func

from api.infra.database import Base
from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum


class Mushroom(Base):
    __tablename__ = "mushrooms"

    id = Column(Integer, primary_key=True, autoincrement=True)
    mushroom_class = Column(Enum(ClassEnum), nullable=False)
    cap_diameter = Column(Float, nullable=False)
    cap_shape = Column(Enum(CapShapeEnum), nullable=True)
    cap_surface = Column(Enum(CapSurfaceEnum), nullable=True)
    cap_color = Column(Enum(CapColorEnum), nullable=True)
    does_bruise_bleed = Column(Enum(DoesBruiseBleedEnum), nullable=True)
    gill_attachment = Column(Enum(GillAttachmentEnum), nullable=True)
    gill_spacing = Column(Enum(GillSpacingEnum), nullable=True)
    gill_color = Column(Enum(CapColorEnum), nullable=True)  # Reuses CapColorEnum
    stem_height = Column(Float, nullable=False)
    stem_width = Column(Float, nullable=False)
    stem_root = Column(Enum(StemRootEnum), nullable=True)
    stem_surface = Column(Enum(CapSurfaceEnum), nullable=True)  # Reuses CapSurfaceEnum
    stem_color = Column(Enum(CapColorEnum), nullable=True)  # Reuses CapColorEnum
    veil_type = Column(Enum(VeilTypeEnum), nullable=True)
    veil_color = Column(Enum(CapColorEnum), nullable=True)  # Reuses CapColorEnum
    has_ring = Column(Enum(DoesBruiseBleedEnum), nullable=True)  # Reuses DoesBruiseBleedEnum
    ring_type = Column(Enum(RingTypeEnum), nullable=True)
    spore_print_color = Column(Enum(CapColorEnum), nullable=True)  # Reuses CapColorEnum
    habitat = Column(Enum(HabitatEnum), nullable=True)
    season = Column(Enum(SeasonEnum), nullable=True)
    created_at = Column(DateTime, default=func.now())
    user = Column(String(50), nullable=True)
