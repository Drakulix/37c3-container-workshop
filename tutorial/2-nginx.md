## Chapter 2 - Volumes & Network

It is time for the second service this application needs: Nginx

But fear not, you got this. After setting up a database, you are a Pro at this, how difficult can it be?

Of course there is also an existing image here: https://hub.docker.com/_/nginx

### Volumes & Network

From this point onwards, we will need files from this repository to run our project.
So if you haven't done this yet, clone this repository: `git clone https://github.com/Drakulix/37c3-container-workshop.git`. The rest of the tutorial will assume your current directory will be set to the root of project.

But getting this to run requires some files from the file system.
You can add those with a [bind mount](https://docs.docker.com/storage/bind-mounts/).

Nginx is a web server, so we want to be able to connect to it from our web browser.
Read about [published ports](https://docs.docker.com/network/#published-ports).

### Requirements

(again, hints are only meant to be used, when you are stuck!)

**Note**: You are supposed to figure out how the nginx image works and is configured. So take a good look at its README!

- [ ] Nginx needs to use the `nginx.conf` from this repository. ([Hint](https://github.com/docker-library/docs/blob/master/nginx/README.md#customize-configuration))
- [ ] The config file will tell nginx to listen on port `8080`. You need to connect any port from the outside (e.g. `8000`) to `8080` inside the container.
- [ ] The server will try to serve files from *somewhere*. We want that to match the files inside `client/dist` from this repository.
- [ ] Both mounts should be read-only

Once the container runs you should be able to navigate to `http://localhost:8000` and see a non-working web app.

(**Note**: If you run this on MacOS or Windows, you might need to figure out the IP of your Docker VM instead.)

**Troubleshooting**: If you run into "Permission denied"-errors and you are running Fedora or another SELinux-enabled distribution,
you need an additional flag for running containers with bind-mounts (it's more complicated, but this will suffice for this tutorial): `--security-opt label=disable`. (You will run into the same problem with other containers including those run with docker-compose in Chapter 4.)

### Outro

Some of you may have picked up on the fact, that we are using pre-compiled html/js files here, instead of building the frontend first. This was done to speed up getting to a running application, we may *optionally* address this in a later chapter, but realistically you would already have a way to build the frontend anyway. So why put all the source code into the container...

Continue [here](./3-backend.md)
