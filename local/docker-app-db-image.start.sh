#!/usr/bin/env bash

. ./local/run.sh

CONTAINER_NAME='mytube-app-db'
CONFIG=.env

run ${CONTAINER_NAME} ${CONFIG}
