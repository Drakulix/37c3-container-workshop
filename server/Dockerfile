FROM denoland/deno:alpine

ADD --chown=deno . /app/
WORKDIR /app

USER deno
RUN deno cache /app/main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]