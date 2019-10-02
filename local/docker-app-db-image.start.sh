#!/usr/bin/env bash

CONTAINER_NAME='mytube-app-db'
CONFIG=.env

echo "Execute 'run' function with next parameters: "
echo "CONTAINER_NAME is $CONTAINER_NAME"
echo "CONFIG is $CONFIG"

PORT="$(grep DB_PORT ${CONFIG} | xargs)"
PORT=${PORT#*=}

echo "PORT is ${PORT}"

docker volume create crv_mysql
docker run --env-file ${CONFIG} --name ${CONTAINER_NAME} --mount type=volume,src=crv_mysql,dst=/var/lib/mysql -p ${PORT}:3306 -d mysql:latest

CONTAINER_ID=$(docker ps -aqf "name=$CONTAINER_NAME")

echo ${CONTAINER_ID}
echo "Mysql image started with container id $CONTAINER_ID and name $CONTAINER_NAME"
