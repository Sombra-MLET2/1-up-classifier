import joblib
from sqlalchemy.orm import Session
from api.repositories.mushroom_repository import df_find_mushrooms_by_id
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline


def predict_mushroom_by_id(db_con: Session, id: int):
    mushroom = df_find_mushrooms_by_id(db_con, id)
    model = load_model()
    preprocessor = load_preprocessor()
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', model)
        ])
    return predict(pipeline, mushroom)


def predict(pipeline: Pipeline, mushroom):
    return pipeline.predict(mushroom)


def load_model() -> object:
    model = joblib.load("ml-models/model/Model_Random_Forest.sav")
    return model


def load_preprocessor() -> ColumnTransformer:
    imputer = joblib.load("ml-models/transform/Imputer.sav")
    label_encoder = joblib.load("ml-models/transform/LabelEncoder.sav")
    cat_scaler = joblib.load("ml-models/transform/CatScaler.sav")
    num_scaler = joblib.load("ml-models/transform/NumScaler.sav")
    categorical_cols = []
    numerical_cols = []

    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', Pipeline([
                ('imputer', imputer),
                ('label', label_encoder),
                ('cat_scaler', cat_scaler)
            ]), categorical_cols),
            ('num', num_scaler, numerical_cols),
        ]
    )
    return preprocessor
