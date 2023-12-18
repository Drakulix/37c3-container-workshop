#!/bin/sh

docker run --rm -it -v (pwd):/work -w /work node:20 bash -c "npm i; npm run build"