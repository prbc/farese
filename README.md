# Farese

This is a directory of Reformed Baptist churches, started by Johnny Farese.

You'll find the site live at [farese.com](http://farese.com).

## Running locally

You can run the website on your local machine by running the prbc/farese Docker container. If you're wanting to modify the source to contribute changes, running the Docker container won't be of much help. You'll want to run the normal `git clone` in that case. 

Once you have Docker installed, run:

`docker pull prbc/farese` to download the image, then

`docker run -d --name=farese-container --restart=always -p 80:80 prbc/farese` to run the container. 
 - `-d` is to detach after running
 - `--name` is the container's name
 - `--restart` is to start it again in case of a crash
 - `-p` is to forward port 80 on the host to port 80 on the docker container

You can now view your local copy of Farese.com by going to http://localhost in your browser.

## Contributing
Contributions are very much welcome. Feel free to fork the repository, and once your changes are made, you can submit a pull request. 

If you're thinking about adding a new feature, please first create a new issue so we can discuss it, just to make sure that's the direction we want to go.

If it's something that already has an issue though, go right ahead!
