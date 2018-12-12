#!/bin/bash

GIT_COMMIT=$1

docker push jakobj13/hgop:game-api$GIT_COMMIT || exit 1


docker push jakobj13/hgop:uiTag$GIT_COMMIT || exit 1

# TODO exit on error if any command fails
