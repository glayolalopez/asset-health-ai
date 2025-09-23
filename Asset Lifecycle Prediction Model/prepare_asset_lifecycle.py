import pandas as pd
from datetime import datetime

# Load the Excel file and the 'Export' sheet
file_path = r"C:\Users\sbojjapally\asset-health-ai\Maximo Asset Data.xlsx"
df = pd.read_excel(file_path, sheet_name="Export")

# Select relevant columns
columns_to_keep = [
    "Asset ID",
    "Install Date",
    "Life Expectancy (# of Years)",
    "Site End Of Life Date",
    "Asset Type",
    "Manufacturer",
    "Status",
    "Location Description"
]
df = df[columns_to_keep]

# Convert dates to datetime format
df["Install Date"] = pd.to_datetime(df["Install Date"], errors="coerce")
df["Site End Of Life Date"] = pd.to_datetime(df["Site End Of Life Date"], errors="coerce")

# Drop rows with missing critical dates
df.dropna(subset=["Install Date", "Site End Of Life Date"], inplace=True)

# Calculate asset age and remaining life
today = pd.Timestamp(datetime.today())
df["Asset Age (Years)"] = (today - df["Install Date"]).dt.days / 365.25
df["Remaining Life (Years)"] = (df["Site End Of Life Date"] - today).dt.days / 365.25

# Save cleaned data to a new file
df.to_csv("Cleaned_Asset_Lifecycle.csv", index=False)

print("✅ Data cleaned and saved to 'Cleaned_Asset_Lifecycle.csv'")
