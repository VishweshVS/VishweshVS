from mlxtend.frequent_patterns import apriori
from prepare import encoded_data
# Apply the Apriori algorithm to find frequent itemsets
frequent_itemsets = apriori(encoded_data, min_support=0.4, use_colnames=True)

# Display the frequent itemsets
print("Frequent Itemsets:")
print(frequent_itemsets)