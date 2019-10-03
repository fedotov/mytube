#!/usr/bin/env bash

#$1 CONTAINER_NAME
#$2 CONFIG

run () {
  echo "Execute 'run' function with next parameters: "
  echo "CONTAINER_NAME is $1"
  echo "CONFIG is $2"

  PORT="$(grep DB_PORT $2 | xargs)"
  PORT=${PORT#*=}

  echo "PORT is ${PORT}"

  docker volume create crv_mysql
  docker run --env-file ${2} --name ${1} --mount type=volume,src=crv_mysql,dst=/var/lib/mysql -p ${PORT}:3306 -d mysql:latest

  CONTAINER_ID=$(docker ps -aqf "name=$1")

  echo ${CONTAINER_ID}
  echo "Mysql image started with container id $CONTAINER_ID and name $1"
}
