from part10 import results
# Find the model with the lowest RMSE
best_rmse_model = min(results, key=lambda k: results[k]['RMSE'])
lowest_rmse = results[best_rmse_model]['RMSE']

# Find the model with the highest Adjusted R-squared
best_adj_r2_model = max(results, key=lambda k: results[k]['Adjusted R-squared'])
highest_adj_r2 = results[best_adj_r2_model]['Adjusted R-squared']

print("\nBest Model based on Metrics:")
print(f"Model with Lowest RMSE: {best_rmse_model} (RMSE: {lowest_rmse:.4f})")
print(f"Model with Highest Adjusted R-squared: {best_adj_r2_model} (Adjusted R-squared: {highest_adj_r2:.4f})")

# Check if the best model is the same for both metrics
if best_rmse_model == best_adj_r2_model:
    print(f"\nThe best model based on both lowest RMSE and highest Adjusted R-squared is: {best_rmse_model}")
else:
    print("\nThe best model differs based on the metric:")
    print(f"- Lowest RMSE: {best_rmse_model}")
    print(f"- Highest Adjusted R-squared: {best_adj_r2_model}")