#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t jakobj13/hgop:game-api$GIT_COMMIT . || exit 1

cd ../game-client
docker build -t jakobj13/hgop:uiTag$GIT_COMMIT . || exit 1

# TODO exit on error if any command fails
