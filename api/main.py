import logging

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import api.infra.configs as configs
from api.datasets.route import datasets_router
from api.infra.database import engine, Base
from api.mushrooms.route import mushrooms_router
from api.sessions.route import sessions_router

logging.info(f"*** 1-Up Mushroom Safety Classifier - API running on {configs.ENV} environment ***")

app = FastAPI(root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],  # Allows specific origins
    allow_credentials=True,  # Allows cookies to be sent
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(datasets_router)
app.include_router(mushrooms_router)
app.include_router(sessions_router)

# SQLAlchemy create tables
Base.metadata.create_all(bind=engine)


@app.get("/",
         tags=["tech-challenge"],
         summary="Team & Project Info")
async def root():
    return {
        "FIAP": {
            "success": True,
            "tech_challenge": "Phase 3 - Mushroom Safety Classifier 🍄",
            "team": "Sombra-MLET2"
        }
    }