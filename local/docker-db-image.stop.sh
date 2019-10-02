#!/usr/bin/env bash

CONTAINER_NAME_APP='mytube-app-db'

CONTAINER_ID_APP=$(docker ps -aqf "name=$CONTAINER_NAME_APP")
docker stop "$CONTAINER_NAME_APP"
docker rm "$CONTAINER_NAME_APP"

echo "Mysql images stopped and removed with container id $CONTAINER_NAME_APP"
