import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler, LabelEncoder
from google.colab import files

print("Please upload 'Life_Expectency_data.csv'")
uploaded = files.upload()

df = pd.read_csv('Life_Expectency_data.csv')

df.columns = df.columns.str.strip()

print("First 5 rows:")
print(df.head())

print("\nDataset Info:")
df.info()

print("\nStatistical Summary:")
print(df.describe())

print("\nMissing values per column:")
print(df.isnull().sum())

df = df.drop(['Population', 'GDP'], axis=1)

numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns
categorical_cols = df.select_dtypes(include=['object']).columns

for col in numerical_cols:
    df[col].fillna(df[col].median(), inplace=True)

for col in categorical_cols:
    df[col].fillna(df[col].mode()[0], inplace=True)

print("\nMissing values after filling:")
print(df.isnull().sum().sum())

print(f"\nDataset size: {df.shape[0]} rows, {df.shape[1]} columns")

print(f"\nDuplicate rows: {df.duplicated().sum()}")

df = df.drop_duplicates()

print(f"Dataset size after removing duplicates: {df.shape[0]} rows, {df.shape[1]} columns")

numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()

df_scaled = df.copy()
scaler = StandardScaler()

for col in numerical_cols:
    if col != 'Year':
        df_scaled[col] = scaler.fit_transform(df[[col]])

categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

df_encoded = df.copy()
le = LabelEncoder()

for col in categorical_cols:
    df_encoded[col] = le.fit_transform(df[col])

df_years = df[df['Year'].between(2011, 2015)]
life_exp_trend = df_years.groupby('Year')['Life expectancy'].mean()

plt.figure(figsize=(10, 6))
plt.plot(life_exp_trend.index, life_exp_trend.values, marker='o', linewidth=2)
plt.xlabel('Year')
plt.ylabel('Life Expectancy')
plt.tight_layout()
plt.savefig('life_expectancy_trend.png')
plt.show()

infant = df_years.groupby('Year')['infant deaths'].mean()
under_five = df_years.groupby('Year')['under-five deaths'].mean()
adult = df_years.groupby('Year')['Adult Mortality'].mean()

x = np.arange(len(infant))
width = 0.25

plt.figure(figsize=(12, 6))
plt.bar(x - width, infant.values, width)
plt.bar(x, under_five.values, width)
plt.bar(x + width, adult.values, width)

plt.xticks(x, infant.index)
plt.tight_layout()
plt.savefig('mortality_comparison.png')
plt.show()

numerical_df = df.select_dtypes(include=['int64', 'float64'])
corr_matrix = numerical_df.corr()

plt.figure(figsize=(14, 12))
sns.heatmap(corr_matrix, annot=True, fmt='.2f')
plt.tight_layout()
plt.savefig('correlation_heatmap.png')
plt.show()

life_exp_corr = corr_matrix['Life expectancy'].abs().sort_values(ascending=False)

print("\nTop 3 features highly correlated with Life expectancy:")
print(life_exp_corr[1:4])

print("\nTop 3 least correlated features with Life expectancy:")
least_corr = life_exp_corr[-3:]
print(least_corr)

df = df.drop(least_corr.index.tolist(), axis=1)

df.to_csv('cleaned.csv', index=False)


# Exercise 2

data = {
    'Age': ['25', '30', '35', '40', '45'],
    'Income': ['$1000.5', '$1500.0', '$2000.75', '?', '$3000.25'],
    'Signup_Date': ['2023-01-15', '2023-02-20', '2023-03-25', '2023-04-30', '2023-05-05'],
    'Color': ['Red', 'Blue', 'Green', 'Red', 'Blue'],
    'Score': [85, 90, 78, 92, 88]
}

df2 = pd.DataFrame(data)

df2['Age'] = df2['Age'].astype(int)

df2['Income'] = df2['Income'].str.replace('$', '', regex=False)
df2['Income'] = df2['Income'].replace('?', np.nan)
df2['Income'] = df2['Income'].astype(float)
df2['Income'].fillna(df2['Income'].median(), inplace=True)

df2['Signup_Date'] = pd.to_datetime(df2['Signup_Date'])

df2['Color'] = df2['Color'].astype('category')

df2['Score'] = df2['Score'].astype('int32')

print(df2.dtypes)