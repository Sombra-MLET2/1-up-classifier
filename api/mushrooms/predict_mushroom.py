import joblib
import pandas as pd
from enum import Enum
from api.dtos import MushroomDTO
from sqlalchemy.orm import Session
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from api.repositories.mushroom_repository import (df_find_mushrooms_by_id, df_find_all_mushrooms, find_mushrooms_by_id,
                                                  find_mushrooms_all)

drop_cols = ['id', 'stem_root', 'stem_surface', 'veil_type', 'veil_color', 'spore_print_color', 'created_at', 'user']
rename_cols = {"mushroom_class": "class", "cap_diameter": "cap-diameter", "stem_height": "stem-height",
               "stem_width": "stem-width", "cap_shape": "cap-shape", "cap_surface": "cap-surface",
               "cap_color": "cap-color", "does_bruise_bleed": "does-bruise-or-bleed",
               "gill_attachment": "gill-attachment", "gill_spacing": "gill-spacing", "gill_color": "gill-color",
               "stem_color": "stem-color", "has_ring": "has-ring", "ring_type": "ring-type"}


def predict_mushroom_by_id(db_con: Session, id: int):
    df_mushroom = df_find_mushrooms_by_id(db_con, id)
    mushroom = find_mushrooms_by_id(db_con, id)
    result = predict(df_mushroom)
    return format_response(result, mushroom)


def predict_mushroom_all(db_con: Session):
    df_mushroom = df_find_all_mushrooms(db_con)
    mushroom = find_mushrooms_all(db_con)
    result = predict(df_mushroom)
    return format_response(result, mushroom)


def predict(mushroom: pd.DataFrame):
    mushroom = pre_processor(mushroom)
    model = load_model()
    return model.predict(mushroom)


def load_model() -> RandomForestClassifier:
    return joblib.load("ml-models/model/Model_Random_Forest.gz")


def pre_processor(mushroom: pd.DataFrame) -> pd.DataFrame:
    imputer: SimpleImputer = joblib.load("ml-models/transform/Imputer.gz")
    label_encoder: [] = joblib.load("ml-models/transform/LabelEncoder.gz")
    cat_scaler: MinMaxScaler = joblib.load("ml-models/transform/CatScaler.gz")
    num_scaler = joblib.load("ml-models/transform/NumScaler.gz")

    mushroom.drop(columns=drop_cols, inplace=True, errors='ignore')
    mushroom.rename(columns=rename_cols, inplace=True)
    categorical_cols = mushroom.select_dtypes(include='object').columns
    numerical_cols = mushroom.select_dtypes(include='float64').columns
    mushroom = mushroom.applymap(lambda x: x.value if isinstance(x, Enum) else x)

    for col in categorical_cols:
        mushroom[col].fillna('Desconhecido', inplace=True)
    mushroom[numerical_cols] = imputer.transform(mushroom[numerical_cols])
    for encoder in label_encoder:
        col: str = encoder[0]
        le: LabelEncoder = encoder[1]
        mushroom[col] = le.transform(mushroom[col])
    mushroom[categorical_cols] = cat_scaler.transform(mushroom[categorical_cols])
    mushroom[numerical_cols] = num_scaler.transform(mushroom[numerical_cols])
    mushroom.drop(columns=['class'], inplace=True)
    return mushroom


def format_response(result: [], data: []):
    result_list = []
    for (result_item, data_item) in zip(result, data):
        aux = {
            'mushroom': MushroomDTO.model_validate(data_item),
            'edible': True if result_item == 1 else False
        }
        result_list.append(aux)
    return {'result': result_list}
