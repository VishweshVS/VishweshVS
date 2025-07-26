from mlxtend.frequent_patterns import association_rules
from apriori import frequent_itemsets
# Generate association rules
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)

# Display the association rules
print("Association Rules (Lift > 1):")
print(rules)
# Filter the rules DataFrame to select only the rows where the 'lift' column is greater than 1
rules_lift_greater_than_1 = rules[rules['lift'] > 1]

# Display the filtered DataFrame
print("Association Rules with Lift > 1:")
print(rules_lift_greater_than_1)

# Print a statement mentioning the significance of lift > 1
print("\nCombinations with a lift greater than 1 are good to go together more often than if they were independent.")