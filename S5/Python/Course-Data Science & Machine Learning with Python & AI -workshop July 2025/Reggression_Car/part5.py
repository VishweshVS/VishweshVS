from part4 import independent_variables
import pandas as pd
from IPython.display import display

# Apply one-hot encoding to categorical columns and convert to integers
independent_variables_encoded = pd.get_dummies(independent_variables, columns=['Fuel_Type', 'Seller_Type', 'Transmission'], drop_first=True) * 1

# Display the first few rows of the encoded DataFrame
print("Independent Variables after One-Hot Encoding:")
display(independent_variables_encoded.head())
