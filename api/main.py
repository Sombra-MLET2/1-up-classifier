import logging

from fastapi import FastAPI

import api.infra.configs as configs
from api.datasets.route import datasets_router
from api.infra.database import engine, Base
from api.mushrooms.route import mushrooms_router

logging.info(f"*** 1-Up Mushroom Safety Classifier - API running on {configs.ENV} environment ***")

app = FastAPI(root_path="/api")
app.include_router(datasets_router)
app.include_router(mushrooms_router)

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