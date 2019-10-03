#!/usr/bin/env bash

. ./local/run.sh

CONTAINER_NAME='mytube-test-db'
CONFIG=.test.env

run ${CONTAINER_NAME} ${CONFIG}
