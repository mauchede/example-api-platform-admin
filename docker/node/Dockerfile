FROM timonier/node:latest

COPY ./docker/node/rootfs /

COPY ./ /srv
WORKDIR /srv

ENTRYPOINT [ "dumb-entrypoint" , "docker-entrypoint.sh" ]
