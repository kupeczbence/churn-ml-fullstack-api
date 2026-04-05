import os
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Customer Churn Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # devhez ok
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "model", "churn_model.joblib"))
feature_columns = joblib.load(os.path.join(BASE_DIR, "model", "feature_columns.joblib"))


class Customer(BaseModel):
    tenure: int
    MonthlyCharges: float
    TotalCharges: float


@app.get("/")
def read_root():
    return {"message": "Churn Prediction API is running"}


@app.post("/predict")
def predict(customer: Customer):
    data = pd.DataFrame([customer.dict()])

    # align with training columns
    for col in feature_columns:
        if col not in data.columns:
            data[col] = 0

    data = data[feature_columns]

    proba = model.predict_proba(data)[0][1]

    threshold = 0.3
    pred = 1 if proba > threshold else 0

    return {
        "churn_probability": float(proba),
        "prediction": "Churned" if pred == 1 else "Stayed",
    }