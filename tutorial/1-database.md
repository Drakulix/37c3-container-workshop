## Chapter 1 - Our first container

It is time for our first container!

Our application needs a [Postgres](https://www.postgresql.org) database.

Fortunately the docker image registry already has a pre-made image for postgres, how convenient: [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres).
And its README already tells us a bunch of example commands to get going!

For this we need the [`docker run`-command](https://docs.docker.com/engine/reference/run/) (for more options see the [`docker run`-command line reference](https://docs.docker.com/engine/reference/commandline/run/)).

Armed with the example commands from the Docker Hub page and the docker-run reference, you should be able to get a postgres container running.

If you create a container, which doesn't do exactly what you wanted to, you can list your containers with `docker ps`. Then with either its name or its id, you can stop it (if it is still running) using `docker stop [id|name]` and delete it with `docker rm [id|name]`.

### Requirements

Try to setup a postgres database container and follow these requirements (hints are meant to point you in the right direction **if** you are *stuck*!):

- [ ] It should use the `latest` tag of the image ([Hint](https://docs.docker.com/engine/reference/run/#imagetag))
- [ ] It's name should be `db` for database ([Hint](https://docs.docker.com/engine/reference/run/#container-identification))
- [ ] The database password should be `supersecret` ([Hint](https://github.com/docker-library/docs/blob/master/postgres/README.md#postgres_password))
- [ ] Don't detach it, so you can see it start up in your terminal ([Hint](https://docs.docker.com/engine/reference/run/#detached-vs-foreground))

### Questions

Once you successfully achieved that, try to answer the following questions:
- [ ] How is the password propagated to postgres process inside the container? ([Hint](https://docs.docker.com/engine/reference/run/#env-environment-variables))

### Outro

Lastly you can run the container with `-d` (and remove `-i` or `-t`) to detach it from the active terminal and keep it running in the background.

You can list your running containers with `docker ps` (and also stopped containers via `docker ps -a`).
Additionally you can list downloaded images with `docker images`, which should now contain the `postgres` image!

Continue [here](./2-nginx.md)