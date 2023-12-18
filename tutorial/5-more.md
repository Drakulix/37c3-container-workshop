## Chapter 5 - More yaks to shave

Of course there is much more to learn here. If you feel motivated to continue, check out some of these challenges (each can be done independently from the rest).

The official very detailed tutorial ends here. `:)`

The `solution`-branch of this repository contains a docker-compose.yml and Dockerfile for everything up to this point. The rest of the challenges have no solutions and are more vague in their descriptions. But if you made it this far, you are a container professional by now, I am sure you'll be able to figure out the rest!

### Volumes vs bind-mounts

So far we have only used bind-mounts for persistent data, however docker provides a second mechanism to manage data, that does not require manually specifying a folder.

- [Volumes in docker](https://docs.docker.com/storage/volumes/)
- [Compose volume reference](https://docs.docker.com/compose/compose-file/07-volumes/)

You may have noticed that the chat log gets cleared, if you remove the database container. Binding the actual database to the existence of a container, sounds like a bad idea, that could easily lead to data loss.

- [ ] Try setting up a volume for postgres to store it's database in with your compose file.

### Networks

So far we only used the implicit default network created by docker-compose for us to connect our containers together.

But technically only our backend needs to talk to the database, while nginx only needs to talk to our backend.
The link between nginx and the backend is unnecessary and thus a potential security issue. (Somebody breaking into the nginx container directly gets access to the database instead of also having to take over the backend first.)

- [Networking in docker](https://docs.docker.com/network/)
- [Networking with compose](https://docs.docker.com/compose/networking/)
- [Compose network reference](https://docs.docker.com/compose/compose-file/06-networks/)

We can fix this by creating separate networks for each link and only connecting the relevant containers to them.

- [ ] Change the compose file, so that nginx and the backend are in one network and that the backend and database containers are in another. (Backend will thus be part of two networks).

### Building the frontend

So far we used pre-built files for the frontend served by nginx. This is not exactly the cleanest solution, as they could be out of date! We risk forget building the latest version of the frontend and split setting up into more steps than necessary.

Fortunately building the frontend doesn't require a lot of steps.

- [ ] Create a `Dockerfile` in the client folder
- [ ] The image should be based on the `latest`-tag of the `node` image. ([Hint](https://hub.docker.com/_/node))
- [ ] The image should contain the application, it should not be necessary to be bind-mounted at runtime. ([Hint](https://docs.docker.com/engine/reference/builder/#add))
- [ ] For building the image needs to run two commands:
  - [ ] `npm install`
  - [ ] `npm run build`
- [ ] Verify it builds using `docker build ./client/`

But now we still have an extra step, we need to build the image instead of building the frontend?! And because we copied the frontend into the container, the build files are now inside the image, how can we add those to nginx?!

Fortunately docker has a really neat feature called `multi-stage builds`: https://docs.docker.com/build/building/multi-stage/

Using this feature we can create a custom nginx image, that contains our frontend and also builds the frontend!

- [ ] Take your `Dockerfile` for the frontend and rename the first stage to `build`
- [ ] Add another stage based on the `nginx` image
- [ ] Copy the contents of the `dist`-folder from the first stage into `/usr/share/nginx/html`
- [ ] Also copy our nginx.conf from the project folder to `/etc/nginx/nginx.conf`
- [ ] Verify that it still builds using `docker build ./client`
- [ ] Replace the nginx container in your compose file with your custom image (like the backend container) and remove the now unnecessary bind mounts.

### Dev Containers

So far all we have talked about is running/deploying the service. But containers can be used for more, e.g. during actual development to speed up setting up the required tools and also to have a more consistent environment (e.g. same version etc.) during development.

One particularly convenient method, if your tools/IDE supports it, is the devcontainers specification: https://containers.dev/

It allows your project to come with a configuration file (yes, everybody introduces another file, that does almost the same, but a bit different), that your IDE can understand to automatically setup a dev environment for you.

If you want to explore this option, you already know the dependencies of the backend (`server`-folder):
- deno

The frontend needs (see also [Building the frontend](#building-the-frontend)):
- nodejs
- npm

### CI

Continuous Integration is another aspect of development, where containers are very useful.

A lot of CI systems rely on containers to capsulate untrusted code submitted by it's users.

For example [Github Actions](https://docs.github.com/de/actions) is essentially using containers for every step of the process (though with a bunch of abstractions).

Github also provides users with a [container registry](https://docs.github.com/de/packages/working-with-a-github-packages-registry/working-with-the-container-registry), where you can upload your own images similar to the Docker Hub, you have been using as a source through out this tutorial.

- [ ] Create a Github Actions workflow that builds the backend (and frontend, if you did [the frontend task](#building-the-frontend)) image(s). ([Hint](https://github.com/marketplace/actions/build-and-push-docker-images))
- [ ] Extend that workflow to upload the resulting images to the Github Container Registry
- [ ] Change your compose file to download the images from the Github Container Registry instead

Now all you need to share with others for them to be able to run your chat service is your compose file!

## Outro

I hope you had fun. If you feel this project was valuable in any way to you, feel free to leave a `Star` to let me know. If you have any more feedback, feel free to open an issue about it or even do a pull request with any suggestions you may have.

This was a spontaneous idea that developed into something much larger than I initially anticipated. And everybody is free to do whatever you want with these resources, everything is licensed under "The UNLICENSE" making it effectively part of the public domain.

So please fork, modify, extend and share! Host this workshop at your company, give it to your friends or to your enemies!

I am always glad to hear it was of use to someone.

`:)`
