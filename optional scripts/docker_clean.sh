#!/bin/bash

docker rm $(docker container ls -q) --force

docker container prune -f

docker system prune -f

docker volume prune -f

docker network prune -f

docker volume rm $(docker volume ls -q)

