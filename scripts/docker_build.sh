#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t jakobj13/hgop:$GIT_COMMIT .

# TODO exit on error if any command fails
