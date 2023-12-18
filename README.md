# 37c3 Introductory Workshop to Containers!

## Introduction

This is a little example project for workshop attendees during the 37c3, no serious project.

Unfortunately none of its parts are containerized, although it's multiple components could wrapped up be so easily!

Although the tutorial is meant to be used with [`Docker`](https://www.docker.com/get-started/),
feel free to take this as a little challenge for getting familiar with a container engine of your choice.

If you are already familiar with containers in general you may skip through and complete the same exercises with any other engine to get familiar.
It should touch on a bunch of common concepts like image building, persistent storage, networking, etc to test your knowledge.

If you are just starting out on your container journey, I recommend sticking with `Docker` for now and closely follow the tutorial with it's linked resources.

## The application

The example project is a little chat web application (with the typical butt load of dependencies).

It consists out of:
- A little frontend written with the [`Preact`](https://preactjs.com) framework, build with [`npm`](https://www.npmjs.com/) and [`vite`](https://vitejs.dev/)
- A little backend written in Typescript with [`Hono`](https://hono.dev) running on the [`deno`](https://deno.land) runtime
- The way it is setup it also requires
  - A [Postgres](https://postgresql.org) server to persist the chat log
  - A [Nginx](https://www.nginx.com) server setup to serve the frontend and proxy to the backend

## Table of Contents

0. [Setting up your environment](./tutorial/0-environment.md)
1. [Your first container](./tutorial/1-database.md)
2. [Volumes & Network](./tutorial/2-nginx.md)
3. [Creating your own Image & Compose](./tutorial/3-backend.md)
4. [Docker-Compose](./tutorial/4-compose.md)
5. [More yaks to shave](./tutorial/5-more.md)


## License

This work is licensed under `The UNLICENSE`. Do what you want with it!
