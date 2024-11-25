import pandas as pd

from api.infra.loggers import logger
from api.models.enums import ClassEnum, CapShapeEnum, CapSurfaceEnum, CapColorEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum
from api.models.mushroom import Mushroom


def _handle_enum_field(row, mush_enum, field):
    value = row[field]

    if _enum_provided(value):
        if value.strip() not in mush_enum:
            logger.warn(f"Invalid enum value {value} for {mush_enum}")
            return None
        return mush_enum(value.strip())
    return None


def _enum_provided(value):
    value_str = str(value).strip() if value is not None else None

    if pd.isna(value) or value_str.lower() == 'nan' or value_str == '':
        return False
    return True


def map_row_to_mushroom(row, target=None):
    return Mushroom(
        mushroom_class=ClassEnum(target),
        cap_diameter=float(row["cap-diameter"]),
        cap_shape=_handle_enum_field(row, CapShapeEnum, "cap-shape"),
        cap_surface=_handle_enum_field(row, CapSurfaceEnum, "cap-surface"),
        cap_color=_handle_enum_field(row, CapColorEnum, "cap-color"),
        does_bruise_bleed=_handle_enum_field(row, DoesBruiseBleedEnum, "does-bruise-or-bleed"),
        gill_attachment=_handle_enum_field(row, GillAttachmentEnum, "gill-attachment"),
        gill_spacing=_handle_enum_field(row, GillSpacingEnum, "gill-spacing"),
        gill_color=_handle_enum_field(row, CapColorEnum, "gill-color"),
        stem_height=float(row["stem-height"]),
        stem_width=float(row["stem-width"]),
        stem_root=_handle_enum_field(row, StemRootEnum, "stem-root"),
        stem_surface=_handle_enum_field(row, CapSurfaceEnum, "stem-surface"),
        stem_color=_handle_enum_field(row, CapColorEnum, "stem-color"),
        veil_type=_handle_enum_field(row, VeilTypeEnum, "veil-type"),
        veil_color=_handle_enum_field(row, CapColorEnum, "veil-color"),
        has_ring=_handle_enum_field(row, DoesBruiseBleedEnum, "has-ring"),
        ring_type=_handle_enum_field(row, RingTypeEnum, "ring-type"),
        spore_print_color=_handle_enum_field(row, CapColorEnum, "spore-print-color"),
        habitat=_handle_enum_field(row, HabitatEnum, "habitat"),
        season=_handle_enum_field(row, SeasonEnum, "season"),
        user="uci_import"
    )