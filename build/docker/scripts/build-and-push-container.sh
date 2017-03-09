#!/bin/sh

# Once you have logged in with `docker login`, use this to build and push to docker.

sudo docker build --no-cache -t prbc/farese ../Dockerfile
sudo docker push prbc/farese
