import logging

import pandas as pd
from fastapi import HTTPException
from sqlalchemy.orm import Session
from ucimlrepo import fetch_ucirepo

from api.infra.loggers import logger
from api.models.enums import ClassEnum, CapShapeEnum, CapColorEnum, CapSurfaceEnum, DoesBruiseBleedEnum, \
    GillAttachmentEnum, GillSpacingEnum, StemRootEnum, VeilTypeEnum, RingTypeEnum, HabitatEnum, SeasonEnum
from api.models.mushroom import Mushroom
from api.repositories.mushroom_repository import delete_uci_mushrooms, save_mushrooms


async def import_from_uci(db_con: Session) -> int:
    delete_uci_mushrooms(db_con)

    secondary_mushroom = fetch_ucirepo(id=848)

    X = secondary_mushroom.data.features
    y = secondary_mushroom.data.targets

    logger.info(f"Importing {X.shape[0]} records from UCI repository with {X.shape[1]} features...")

    try:
        mushrooms = []

        for index, row in X.iterrows():
            try:
                mushrooms.append(_map_row_to_mushroom(row, y.iloc[index]['class']))
            except Exception as e:
                logger.error(f"Mapping failed for record id {index}: {e}")

        save_mushrooms(db_con, mushrooms)

        inserted = len(mushrooms)

        logging.info(f"Inserted {inserted} records into the mushrooms table from UCI repository")

        return inserted
    except Exception as e:
        db_con.rollback()

        logger.error(f"Failed to import data from UCI repository: {e}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while importing data from UCI repository")


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


def _map_row_to_mushroom(row, target=None):
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
