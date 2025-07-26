import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

ap=pd.read_csv("S5/Python/reference_files/airpollution.csv")
print(ap)
indap=ap.drop('Air Quality',axis=1)
depap=ap['Air Quality']
print("Independant Variables on Air:\n",depap.head(),"\nDependant Variables on Air:\n",indap.head())
x_train_ap,x_test_ap,y_train_ap,y_test_ap=train_test_split(indap,depap,test_size=0.4,random_state=42)


# Display the shapes of the resulting sets
print("Shape of X_train_air:", x_train_ap.shape)
print("Shape of X_test_air:", x_test_ap.shape)
print("Shape of y_train_air:", y_train_ap.shape)
print("Shape of y_test_air:", y_test_ap.shape)

ss=StandardScaler()
x_train_ap_sc=ss.fit_transform(x_train_ap)
x_test_ap_sc=ss.transform(x_test_ap)
print(x_train_ap_sc[:5])
from sklearn.preprocessing import LabelEncoder

# Initialize LabelEncoder
label_encoder = LabelEncoder()

# Fit and transform the dependent variable
dependent_variable_air_encoded = label_encoder.fit_transform(depap)

# Display the first few values of the encoded dependent variable
print("Encoded Dependent Variable (Air Quality):")
print(dependent_variable_air_encoded[:5])
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

# Create a dictionary to store the initialized model objects
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(random_state=42),
    'Support Vector Machine': SVC(random_state=42)
}

# Iterate through the dictionary of models and train them
for model_name, model in models.items():
    print(f"Training {model_name}...")
    model.fit(x_train_ap_sc, y_train_ap)
    print(f"{model_name} trained.")
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Create an empty dictionary to store evaluation results
evaluation_results = {}

# Iterate through the trained models
for model_name, model in models.items():
    # Make predictions on the scaled test data
    y_pred = model.predict(x_test_ap_sc)

    # Calculate evaluation metrics
    accuracy = accuracy_score(y_test_ap, y_pred)
    precision = precision_score(y_test_ap, y_pred, average='weighted')
    recall = recall_score(y_test_ap, y_pred, average='weighted')
    f1 = f1_score(y_test_ap, y_pred, average='weighted')

    # Store the results
    evaluation_results[model_name] = {
        'Accuracy': accuracy,
        'Precision': precision,
        'Recall': recall,
        'F1-score': f1
    }

# Display the evaluation results
print("\nClassification Model Evaluation Results:")
for model_name, metrics in evaluation_results.items():
    print(f"\n{model_name}:")
    for metric_name, value in metrics.items():
        print(f"  {metric_name}: {value:.4f}")
        # Print the evaluation_results dictionary
print("\nClassification Model Evaluation Results (Raw Data):")
print(evaluation_results)

# Iterate through the evaluation_results dictionary and print the metrics in a formatted way
print("\nClassification Model Evaluation Results:")
for model_name, metrics in evaluation_results.items():
    print(f"\n{model_name}:")
    for metric_name, value in metrics.items():
        print(f"  {metric_name}: {value:.4f}")