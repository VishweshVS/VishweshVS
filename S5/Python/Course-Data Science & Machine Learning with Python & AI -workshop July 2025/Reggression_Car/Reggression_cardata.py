import pandas as pd
from IPython.display import display
# Path to the CSV file 
csv_file_path = 'S5/Python/reference_files/cardata.csv'

# Read the CSV file into a pandas DataFrame
try:
    df = pd.read_csv(csv_file_path)
    # Display the first 5 rows of the DataFrame
    display(df.head())
except FileNotFoundError:
    print(f"Error: The file '{csv_file_path}' was not found. Please make sure the file exists in your Google Drive.")
except Exception as e:
    print(f"An error occurred: {e}")



