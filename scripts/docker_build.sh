#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t jakobj13/hgop:game_$GIT_COMMIT . || exit 1

cd ..
cd game-client
docker build -t jakobj13/hgop:ui_$GIT_COMMIT . || exit 1