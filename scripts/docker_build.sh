#!/bin/bash

GIT_COMMIT=$1

cd itemrepository
docker build -t jakobj13/hgop2018:$GIT_COMMIT .

# TODO exit on error if any command fails