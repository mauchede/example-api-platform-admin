#!/bin/sh
set -e

if [ "${NODE_ENV}" == "production" ] ; then
    yarn install --non-interactive --production
    yarn build
    exec serve --port 3000 --silent --single --unzipped build
else
    yarn install --non-interactive
    exec yarn start
fi
