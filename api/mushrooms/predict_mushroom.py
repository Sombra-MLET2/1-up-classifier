import joblib
import pandas as pd
from enum import Enum
from sqlalchemy.orm import Session
from api.repositories.mushroom_repository import df_find_mushrooms_by_id, df_find_all_mushrooms
from sklearn.ensemble import RandomForestClassifier

drop_cols = ['id', 'stem_root', 'stem_surface', 'veil_type', 'veil_color', 'spore_print_color', 'created_at', 'user']
rename_cols = {"mushroom_class": "class", "cap_diameter": "cap-diameter", "stem_height": "stem-height",
               "stem_width": "stem-width", "cap_shape": "cap-shape", "cap_surface": "cap-surface",
               "cap_color": "cap-color", "does_bruise_bleed": "does-bruise-or-bleed",
               "gill_attachment": "gill-attachment", "gill_spacing": "gill-spacing", "gill_color": "gill-color",
               "stem_color": "stem-color", "has_ring": "has-ring", "ring_type": "ring-type"}


def predict_mushroom_by_id(db_con: Session, id: int):
    mushroom = df_find_mushrooms_by_id(db_con, id)
    return predict(mushroom)


def predict_mushroom_all(db_con: Session):
    mushroom = df_find_all_mushrooms(db_con)
    return predict(mushroom)


def predict(mushroom: pd.DataFrame):
    mushroom = pre_processor(mushroom)
    model = load_model()
    return model.predict(mushroom)


def load_model() -> RandomForestClassifier:
    return joblib.load("ml-models/model/Model_Random_Forest.sav")


def pre_processor(mushroom: pd.DataFrame) -> pd.DataFrame:
    imputer = joblib.load("ml-models/transform/Imputer.sav")
    label_encoder = joblib.load("ml-models/transform/LabelEncoder.sav")
    cat_scaler = joblib.load("ml-models/transform/CatScaler.sav")
    num_scaler = joblib.load("ml-models/transform/NumScaler.sav")

    mushroom.drop(columns=drop_cols, inplace=True)
    mushroom.rename(columns=rename_cols, inplace=True)
    categorical_cols = mushroom.select_dtypes(include='object').columns
    numerical_cols = mushroom.select_dtypes(include='float64').columns
    mushroom = mushroom.applymap(lambda x: x.value if isinstance(x, Enum) else x)

    for col in categorical_cols:
        mushroom[col].fillna('Desconhecido', inplace=True)
    mushroom[numerical_cols] = imputer.transform(mushroom[numerical_cols])
    # Need Fix
    for col in categorical_cols:
        mushroom[col] = label_encoder.transform(mushroom[col])
    mushroom[categorical_cols] = cat_scaler.transform(mushroom[categorical_cols])
    mushroom[numerical_cols] = cat_scaler.transform(mushroom[numerical_cols])
    return mushroom
