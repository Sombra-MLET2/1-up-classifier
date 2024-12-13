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

### Overview
The dataset contains 21 variables, including a binary class variable indicating mushroom safety (edible or poisonous). The remaining variables provide descriptive attributes of mushrooms. Below is the detailed description of each variable:

### Variables

| **Variable**          | **Type**  | **Description**                                          | **Values**                                                                                                                                       |
|-----------------------|-----------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **class**             | Nominal   | Safety classification                                    | `e` = edible, `p` = poisonous (includes unknown edibility)                                                                                       |
| **cap-diameter**      | Metrical  | Diameter of the mushroom cap in centimeters              | Float value in cm                                                                                                                                |
| **cap-shape**         | Nominal   | Shape of the mushroom cap                                | `b` = bell, `c` = conical, `x` = convex, `f` = flat, `s` = sunken, `p` = spherical, `o` = others                                               |
| **cap-surface**       | Nominal   | Surface texture of the mushroom cap                      | `i` = fibrous, `g` = grooves, `y` = scaly, `s` = smooth, `h` = shiny, `l` = leathery, `k` = silky, `t` = sticky, `w` = wrinkled, `e` = fleshy |
| **cap-color**         | Nominal   | Color of the mushroom cap                                | `n` = brown, `b` = buff, `g` = gray, `r` = green, `p` = pink, `u` = purple, `e` = red, `w` = white, `y` = yellow, `l` = blue, `o` = orange, `k` = black |
| **does-bruise-bleed** | Nominal   | Indicates if the mushroom bruises or bleeds when damaged | `t` = true, `f` = false                                                                                                                         |
| **gill-attachment**   | Nominal   | Attachment type of the gills                             | `a` = adnate, `x` = adnexed, `d` = decurrent, `e` = free, `s` = sinuate, `p` = pores, `f` = none, `?` = unknown                                |
| **gill-spacing**      | Nominal   | Spacing of the gills                                     | `c` = close, `d` = distant, `f` = none                                                                                                          |
| **gill-color**        | Nominal   | Color of the gills                                       | Same as `cap-color` + `f` = none                                                                                                                |
| **stem-height**       | Metrical  | Height of the mushroom stem in centimeters               | Float value in cm                                                                                                                                |
| **stem-width**        | Metrical  | Width of the mushroom stem in millimeters                | Float value in mm                                                                                                                                |
| **stem-root**         | Nominal   | Root type of the mushroom stem                           | `b` = bulbous, `s` = swollen, `c` = club, `u` = cup, `e` = equal, `z` = rhizomorphs, `r` = rooted                                               |
| **stem-surface**      | Nominal   | Surface texture of the mushroom stem                     | Same as `cap-surface` + `f` = none                                                                                                              |
| **stem-color**        | Nominal   | Color of the mushroom stem                               | Same as `cap-color` + `f` = none                                                                                                                |
| **veil-type**         | Nominal   | Type of veil                                             | `p` = partial, `u` = universal                                                                                                                  |
| **veil-color**        | Nominal   | Color of the veil                                        | Same as `cap-color` + `f` = none                                                                                                                |
| **has-ring**          | Nominal   | Indicates the presence of a ring                         | `t` = ring present, `f` = none                                                                                                                  |
| **ring-type**         | Nominal   | Type of ring                                             | `c` = cobwebby, `e` = evanescent, `r` = flaring, `g` = grooved, `l` = large, `p` = pendant, `s` = sheathing, `z` = zone, `y` = scaly, `m` = movable, `f` = none, `?` = unknown |
| **spore-print-color** | Nominal   | Color of the spore print                                 | Same as `cap-color`                                                                                                                              |
| **habitat**           | Nominal   | Typical habitat where the mushroom grows                 | `g` = grasses, `l` = leaves, `m` = meadows, `p` = paths, `h` = heaths, `u` = urban, `w` = waste, `d` = woods                                   |
| **season**            | Nominal   | Season during which the mushroom is commonly found       | `s` = spring, `u` = summer, `a` = autumn, `w` = winter                                                                                          |



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

## Docker-Compose Environment

Execute the `build-compose.sh` to build the whole environment(FE + BE) with reverse proxy:

```bash
   cd deployment/
   ./build-compose.sh
```

This script will:
1. Destroy the current compose environment, if any.
2. Build Front-end image
3. Build Back-end image
4. Create the compose environment

The application will be available via http://localhost:3001/.

Initial user configuration can be arranged via http://localhost:3001/docs#/sessions/add_user_sessions__post
```json
{
  "email": "alice@mail.com",
  "password": "alice123"
}
```

## Main Features

1. **Mushroom Type Prediction:**
   - Classify mushrooms based on various attributes such as cap shape, gill attachment, stem height, and more.
   - API endpoints to create, list, delete and predict mushrooms classes(edible or poisonous).

2. **Dataset Import from UCI:**
   - Import mushroom data from the UCI repository to kick-start the process.
   - Endpoint to remove UCI-imported data for cleanup or re-import.


