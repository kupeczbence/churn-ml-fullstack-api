# Customer Churn Prediction (Fullstack ML App)

This project is an end-to-end Machine Learning application that predicts whether a customer is likely to churn or stay based on their account data. It demonstrates the complete ML workflow, including data preprocessing, model training, API development, frontend integration, and cloud deployment.

The system consists of a trained Machine Learning model, a FastAPI backend that serves predictions, and a React-based frontend that allows users to interact with the model through a clean and user-friendly interface. The application is deployed online using Render.

## Live Demo

- Backend API: https://churn-backend-prfc.onrender.com  

## Model Overview

The model is built using a Random Forest Classifier from scikit-learn. It predicts customer churn based on numerical features such as tenure, monthly charges, and total charges.

The output includes a prediction (Churned or Stayed) along with a probability score that represents the confidence of the prediction.

Since the dataset is slightly imbalanced, a custom decision threshold of 0.3 is used instead of the default 0.5. This helps the model better identify customers who are likely to churn.

## Project Structure

Deployment_MLOps/

├── churn-frontend/        # React frontend  
│   ├── src/  
│   ├── public/  
│   └── package.json  
│  
├── model/                 # Trained ML model  
│   ├── churn_model.joblib  
│   └── feature_columns.joblib  
│  
├── src/                   # Backend source code  
│   ├── main.py  
│   └── preprocess.py  
│  
├── data/                  # Dataset  
│  
├── requirements.txt  
└── README.md  

## Backend (FastAPI)

The backend is implemented using FastAPI and exposes a REST API for making predictions.

To run the backend locally, use the following command:

uvicorn src.main:app --reload

The main prediction endpoint is:

POST /predict

Example request:

{
  "tenure": 12,
  "MonthlyCharges": 70.5,
  "TotalCharges": 800.2
}

Example response:

{
  "churn_probability": 0.42,
  "prediction": "Churned"
}

## Frontend (React + TailwindCSS)

The frontend is built with React and styled using TailwindCSS. It provides an intuitive interface where users can input customer data and receive predictions from the backend.

To run the frontend locally:

cd churn-frontend  
npm install  
npm start  

The interface includes input fields, a prediction button, and a visual representation of the result with color indicators and a probability bar.

## API Integration

The frontend communicates with the backend using a simple fetch request:

fetch("https://churn-backend-prfc.onrender.com/predict")

## Deployment

The application is deployed using Render with a separated architecture.

The backend is deployed as a Web Service running FastAPI, while the frontend is deployed as a Static Site.

Frontend settings on Render:
- Root directory: churn-frontend  
- Build command: npm install && npm run build  
- Publish directory: build  

## Docker

The backend was previously containerized using Docker, but the current deployment uses Render services directly for simplicity and faster setup.

## Technologies Used

Backend:
- FastAPI  
- scikit-learn  
- pandas  
- joblib  

Frontend:
- React  
- TailwindCSS  

Deployment:
- Render  
- GitHub  

## Future Improvements

Possible improvements for this project include adding more input features, improving model performance with hyperparameter tuning, handling class imbalance using techniques like SMOTE, adding user authentication, and building a dashboard with data visualizations.

## Author

- LinkedIn: www.linkedin.com/in/bence-kupecz-119701305
- GitHub: https://github.com/kupeczbence
