import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

from src.preprocess import preprocess


def train_and_save(csv_path: str):
    df = pd.read_csv(csv_path)

    y = df["Churn"].map({"Yes": 1, "No": 0})
    X = preprocess(df.drop(columns=["Churn"]))

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=200, random_state=42, class_weight="balanced")
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    print(classification_report(y_test, preds))

    joblib.dump(model, "model/churn_model.joblib")
    joblib.dump(list(X.columns), "model/feature_columns.joblib")


if __name__ == "__main__":
    train_and_save("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")