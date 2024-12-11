#!/usr/bin/env bash

echo "Cleaning workspace..."

docker-compose down

echo "Done. Building front end image..."

cd ../front-end/

docker build -t sombra/mushroom-front:latest .

echo "Front done. Starting Back end..."

cd ../api/

docker build -t sombra/mushroom-back:latest .

echo "Done. Starting compose environment..."

cd ../deployment/

docker-compose up -d

sleep 5

echo "Mushroom Safety Classifier at live: http://localhost:3001/"