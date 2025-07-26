from part3 import df_no_car_name
import pandas as pd
from IPython.display import display
# Define the target variable (dependent column)
target = 'Selling_Price'

# Separate the independent variables (features) and the dependent variable
independent_variables = df_no_car_name.drop(target, axis=1)
dependent_variable = df_no_car_name[target]

# Display the first few rows of the independent variables DataFrame
print("Independent Variables (Features):")
display(independent_variables.head())

# Display the first few rows of the dependent variable Series
print("\nDependent Variable (Target):")
display(dependent_variable.head())