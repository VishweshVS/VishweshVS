from Reggression_cardata import df
import pandas as pd
from IPython.display import display
# Find the sum of null values in each column
null_values_sum = df.isnull().sum()

# Display the sum of null values
print("Sum of null values in each column:")
display(null_values_sum)