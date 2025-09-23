import pandas as pd
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_absolute_error

# Load cleaned data
df = pd.read_csv("Cleaned_Asset_Lifecycle.csv")

# Dynamic asset age calculation
today = pd.Timestamp(datetime.today())
df["Asset Age (Years)"] = (today - pd.to_datetime(df["Install Date"])).dt.days / 365.25

# Drop rows with missing target
df.dropna(subset=["Life Expectancy (# of Years)"], inplace=True)

# Features and target
X = df[["Asset Age (Years)", "Asset Type", "Manufacturer", "Status", "Location Description"]]
y = df["Life Expectancy (# of Years)"]

# Preprocessing for categorical features
categorical_features = ["Asset Type", "Manufacturer", "Status", "Location Description"]
preprocessor = ColumnTransformer(
    transformers=[("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)],
    remainder="passthrough"
)

# Model pipeline
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model.fit(X_train, y_train)

# Predict life expectancy - total number of years the model estimates an asset will last from the time it was installed 
# (based on historical data patterns from asset type, manufacturer, status, location, and asset age)
df["Predicted Life Expectancy"] = model.predict(X)

# Calculate predicted remaining life - Number of years left from today until asset reaches end of life 
df["Predicted Remaining Life"] = df["Predicted Life Expectancy"] - df["Asset Age (Years)"]

# Fix negative remaining life values
# If the asset is older than its predicted life expectancy, this value will be 0
df["Predicted Remaining Life"] = df["Predicted Remaining Life"].apply(lambda x: max(x, 0))

# Save predictions
df[["Asset ID", "Predicted Life Expectancy", "Predicted Remaining Life"]].to_csv("Asset_Lifecycle_Predictions.csv", index=False)

# Evaluate model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"✅ Model trained. MAE: {mae:.2f} years")
print("📄 Predictions saved to 'Asset_Lifecycle_Predictions.csv'")
