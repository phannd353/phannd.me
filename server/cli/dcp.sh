#! /bin/sh

type=$1
command=$2
shift 2
docker compose -f infrastructure/docker-compose.$type.yaml ${command:-up} $@
