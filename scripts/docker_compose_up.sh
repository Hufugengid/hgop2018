#!/bin/bash

export GIT_COMMIT=$1 #&& API_URL=$2 #localhost:3000=$2
docker-compose down
docker-compose up -d
