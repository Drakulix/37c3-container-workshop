## Chapter 3 - Creating your own image

Now it is time for the backend. Given this is a custom program, nobody has built an image for us. Which means now is the time to build the first image ourselves.

The necessary command to build images is `docker build`.
However `docker build` usually just consumes a `Containerfile` (or a `Dockerfile` - functionally equivalent).

So we need to learn the syntax of a Containerfile.
- See [Packaging your Software](https://docs.docker.com/build/building/packaging/) for an introduction.
- Further consult the [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/) as needed.

### Requirements

Given that this tutorial is not for understanding `deno` (the runtime our backend uses), but to understand containers, I will list the requirements for running the application first:

- We need to have the `deno` tool available.
- We need the files from `./server`
- We can run the application from that directory using `deno run --allow-net --allow-env --allow-read main.ts`

Additional requirements (you know how the hints work by now, right?):
- [ ] The image should be based on the `alpine`-tag of the `denoland/deno` image. ([Hint](https://hub.docker.com/r/denoland/deno))
- [ ] The image should contain the application, it should not be necessary to be bind-mounted at runtime. ([Hint](https://docs.docker.com/engine/reference/builder/#add)) 
- [ ] The application should run as the user `deno` (this user already exists in the base deno image). ([Hint](https://docs.docker.com/engine/reference/builder/#user))
- [ ] The image should cache the necessary dependencies to not download them on every start. Usually this would be done by running `deno cache main.ts`. ([Hint](https://docs.docker.com/engine/reference/builder/#run))
- [ ] Put the resulting `Containerfile`/`Dockerfile` inside the `./server` directory.
- [ ] Verify it builds using `docker build ./server/`, you don't need to try to run the resulting image yet.

### Questions

- [ ] Now that you have built this container... could we have just used the `denoland/deno` image with `docker run` and bind mounted the app?
- [ ] Could we have build our own nginx image to contain the frontend and our custom config instead?
- [ ] What are the advantages/disadvantages of either approach?

### Outro

Continue [here](./4-compose.md)
