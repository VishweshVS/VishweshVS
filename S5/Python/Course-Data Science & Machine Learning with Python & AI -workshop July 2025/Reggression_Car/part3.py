from  part2 import df_cleaned

import pandas as pd
from IPython.display import display
# Remove the 'Car_Name' column and create a new DataFrame
df_no_car_name = df_cleaned.drop('Car_Name', axis=1)

# Display the first 5 rows of the new DataFrame
print("DataFrame after removing 'Car_Name' column:")
display(df_no_car_name.head())
