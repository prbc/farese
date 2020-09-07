#!/bin/sh

# Once you have logged in with `docker login`, use this to build and push to docker.

sudo docker build --no-cache -t prbc/farese ../.
sudo docker push prbc/farese
