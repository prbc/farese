#!/bin/sh

# Assuming the container is named farese-container, this can be used to quickly upgrade
# the running docker container.

sudo docker pull prbc/farese
sudo docker stop farese-container
sudo docker rm farese-container
sudo docker run -d --name=farese-container --restart=always -p 80:80 prbc/farese
