import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import display, HTML
#Read from file the contents.

customerdata=pd.read_csv('S5/Python/reference_files/Customers.csv')

try:
    print(customerdata.head())
except FileNotFoundError:
    print(f"Error:No Such File Exists known by name {customerdata}")
except Exception as e:
    print(f"An error has occurred{e}")

#Finding sum of null values.
display("Sum of Null values:\n",customerdata.isnull().sum())
cdf=pd.DataFrame(customerdata)
cdf.plot('Annual Income (k$)','Spending Score (1-100)',kind= 'scatter')

plt.show()
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
X = customerdata[['Annual Income (k$)','Spending Score (1-100)']]
wcss=[]
for i in range(1,31):
    kmeans = KMeans(n_clusters=i,random_state=42,n_init='auto')
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(range(1,31),wcss,marker='o', linestyle='--')
plt.title("Elbow Method")
plt.show()
# Initialize KMeans with 5 clusters
kmeans = KMeans(n_clusters=5, random_state=42, n_init='auto')

# Fit the KMeans model to the data and get the cluster labels
cluster_labels = kmeans.fit_predict(X)

# Add the cluster labels as a new column to the X DataFrame
X['Cluster'] = cluster_labels

# Display the first few rows of the X DataFrame with the new Cluster column
print("DataFrame with Cluster Labels:")
display(X.head())
plt.figure(figsize=(10, 6))
plt.scatter(X['Annual Income (k$)'], X['Spending Score (1-100)'], c=X['Cluster'], cmap='viridis')
plt.title('K-Means Clustering Results')
plt.xlabel('Annual Income (k$)')
plt.ylabel('Spending Score (1-100)')
plt.colorbar(label='Cluster')
plt.grid(True)
plt.show()