from part9 import X_test_scaled, X_train_scaled, X_train, X_test
from part8 import y_test,y_train 
import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.metrics import mean_squared_error, r2_score

# Function to calculate Adjusted R-squared
def adjusted_r2_score(r2, n_samples, n_features):
    return 1 - ((1 - r2) * (n_samples - 1) / (n_samples - n_features - 1))

# Initialize the models
models = {
    "Linear Regression": LinearRegression(),
    "Ridge": Ridge(),
    "Lasso": Lasso(),
    "ElasticNet": ElasticNet()
}

# Train and evaluate each model
results = {}
for name, model in models.items():
    # Train the model
    model.fit(X_train_scaled, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test_scaled)

    # Calculate RMSE
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))

    # Calculate R-squared
    r2 = r2_score(y_test, y_pred)

    # Calculate Adjusted R-squared
    n_samples = X_test_scaled.shape[0]
    n_features = X_test_scaled.shape[1]
    adj_r2 = adjusted_r2_score(r2, n_samples, n_features)

    # Store the results
    results[name] = {"RMSE": rmse, "Adjusted R-squared": adj_r2}

# Display the results
print("Model Evaluation Results:")
for name, metrics in results.items():
    print(f"{name}:")
    print(f"  RMSE: {metrics['RMSE']:.4f}")
    print(f"  Adjusted R-squared: {metrics['Adjusted R-squared']:.4f}")