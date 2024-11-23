import logging

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import api.infra.configs as configs
from api.infra.database import engine, Base, get_db
from api.ucs.import_from_uci import import_from_uci

logging.info(f"*** 1-Up Mushroom Safety Classifier - API running on {configs.ENV} environment ***")

app = FastAPI()

# SQLAlchemy create tables
Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    return {
        "FIAP": {
            "success": True,
            "tech_challenge": "Phase 3 - Mushroom Safety Classifier 🍄",
            "team": "Sombra-MLET2"
        }
    }

@app.get("/import")
async def import_data(db: Session = Depends(get_db)):

    inserted = await import_from_uci(db)

    return dict(
        success=True,
        message=f"Imported {inserted} records from UCI datasource"
    )
