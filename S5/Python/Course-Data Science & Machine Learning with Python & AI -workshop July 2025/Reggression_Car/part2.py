from Reggression_cardata import df

# Remove duplicate rows
df_cleaned = df.drop_duplicates()

# Display the shape of the cleaned DataFrame
print("Shape of the DataFrame after removing duplicates:")
print(df_cleaned.shape)
