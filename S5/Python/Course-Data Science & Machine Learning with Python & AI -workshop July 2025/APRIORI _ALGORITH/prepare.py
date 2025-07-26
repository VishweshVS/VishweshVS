import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
dataset = [
['Milk', 'Bread'],
['Bread', 'Butter'],
['Milk', 'Bread', 'Butter'],
['Milk'],
['Bread', 'Butter', 'Jam']
]
t=TransactionEncoder()
newd=t.fit(dataset).transform(dataset)
encoded_data=pd.DataFrame(newd,columns= t.columns_)
print(encoded_data.head())