#!/bin/bash

GIT_COMMIT=$1

docker push jakobj13/hgop:game_$GIT_COMMIT || exit 1


docker push jakobj13/ui:_$GIT_COMMIT || exit 1

# TODO exit on error if any command fails
