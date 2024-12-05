#!/bin/bash

DATA_DIR="./data"
DOWNLOAD_URL="https://archive.ics.uci.edu/static/public/848/secondary+mushroom+dataset.zip"
ZIP_FILE="$DATA_DIR/secondary_mushroom_dataset.zip"
INNER_ZIP="MushroomDataset.zip"
INNER_FOLDER="MushroomDataset"

mkdir -p "$DATA_DIR"

echo "Downloading dataset..."
curl -o "$ZIP_FILE" "$DOWNLOAD_URL"

echo "Unzipping outer dataset..."
unzip -o "$ZIP_FILE" -d "$DATA_DIR"

if [ -f "$DATA_DIR/$INNER_ZIP" ]; then
    echo "Unzipping inner dataset..."
    unzip -o "$DATA_DIR/$INNER_ZIP" -d "$DATA_DIR"
else
    echo "Inner zip file not found!"
fi

echo "Removing unwanted files..."
find "$DATA_DIR" -type f ! -regex '.*/secondary_data\.\(csv\|txt\)$' -delete
mv "$DATA_DIR/$INNER_FOLDER/secondary_data.csv" "$DATA_DIR"

rm -Rf "$DATA_DIR/$INNER_FOLDER"

echo "Process completed."