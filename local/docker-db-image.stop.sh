#!/usr/bin/env bash

CONTAINER_NAME_TEST='mytube-test-db'
CONTAINER_NAME_APP='mytube-app-db'

CONTAINER_ID_TEST=$(docker ps -aqf "name=$CONTAINER_NAME_TEST")
docker stop "$CONTAINER_NAME_TEST"
docker rm "$CONTAINER_NAME_TEST"

CONTAINER_ID_APP=$(docker ps -aqf "name=$CONTAINER_NAME_APP")
docker stop "$CONTAINER_NAME_APP"
docker rm "$CONTAINER_NAME_APP"

echo "Mysql images stopped and removed with container id $CONTAINER_NAME_TEST and $CONTAINER_NAME_APP"
