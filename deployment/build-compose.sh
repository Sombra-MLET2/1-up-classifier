#!/usr/bin/env bash

echo "Cleaning workspace..."

docker-compose down

echo "Done. Building front end image..."

cd ../front-end/

docker build -t sombra/mushroom-front:latest .

echo "Front done. Starting Back end..."

cd ../api/

docker build -t sombra/mushroom-back:latest .

echo "Done. Starting compose enviromnent..."

cd ../deployment/

docker-compose up