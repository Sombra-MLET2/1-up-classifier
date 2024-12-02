# Mushroom Safety Classifier

<div align="center">
  <img src="img/1up.png" alt="Mushroom Classifier">
</div>

## Intro

This project is a Mushroom Safety Classifier API developed using FastAPI, ReactJS and Scikit-Learn.

The API allows users to classify mushrooms as either edible or poisonous. The project uses a variety of mushroom attributes to determine the classification, based on data from the UCI Mushroom dataset.


## Mushroom Dataset
The dataset used in this project can be manually retrieved from [UCI Mushroom dataset](https://archive.ics.uci.edu/dataset/848/secondary+mushroom+dataset). Alternatively, it might be imported via UCI Library:

```bash
  pip install ucimlrepo
```

```python
# Import the dataset into your code 
from ucimlrepo import fetch_ucirepo 
  
# fetch dataset 
secondary_mushroom = fetch_ucirepo(id=848) 
  
# data (as pandas dataframes) 
X = secondary_mushroom.data.features 
y = secondary_mushroom.data.targets 
  
# metadata 
print(secondary_mushroom.metadata) 
  
# variable information 
print(secondary_mushroom.variables)
```

## Tech Stack

- **Backend Framework:** FastAPI
- **Frontend Framework:** ReactJS
- **Machine Learning Framework**: Scikit-Learn + Jupyter Notebook
- **Database:** SQLite (default / development)
- **Environment Management:** Python 3.12 virtual environment
- **ORM:** SQLAlchemy
- **Data Handling:** Pandas

### Configuration - Backend

To set up the project, you'll need to configure a Python 3.12 virtual environment and install the necessary dependencies.

1. **Create a Virtual Environment:**
   ```bash
   python3.12 -m venv venv
   ```

2. **Activate the Virtual Environment:**
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Environment Variables:**
   Make sure to set the following environment variables:
   - `MUSH_ENV` (optional, default: `dev`)
   - `MUSH_DATABASE_URL` (optional, default: `sqlite:///./mush-fiap.db`)
   - `JWT_SECRET` (required)
   - `JWT_EXPIRY` (optional, default: `30`)

5. Running the Backend from root folder
   ```bash
   fastapi run api/main.py
   ```     
   
### Configuration - Frontend

To run the project, you'll need node 22+ and install the dependencies.

1. **Install dependencies:**
```bash
   cd front-end/
   npm install
```

2. **Run the Project:**
```bash
   npm start
```

## Main Features

1. **Mushroom Type Prediction:**
   - Classify mushrooms based on various attributes such as cap shape, gill attachment, stem height, and more.
   - API endpoints to create, list, delete and predict mushrooms classes(edible or poisonous).

2. **Dataset Import from UCI:**
   - Import mushroom data from the UCI repository to kick-start the process.
   - Endpoint to remove UCI-imported data for cleanup or re-import.


