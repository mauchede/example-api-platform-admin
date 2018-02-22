# README

Example of upload with `api-platform/admin`.

### Development environment

```sh
cp .env.dist .env
# Edit ".env" with your information

cat > docker-compose.override.yaml << EOF
version: '2.3'

services:

    node:
        env_file:
            - .env
        environment:
            - 'USER=$(id -u)'
        ports:
            - '3000:3000'
        volumes:
            - '/etc/group:/etc/group:ro'
            - '/etc/passwd:/etc/passwd:ro'
            - '${HOME}:${HOME}'
            - './:/srv'
EOF

docker-compose up -d
# Go to "http://localhost:3000/"
```

### Production environment

```sh
cp .env .env.local
# Edit ".env" with your information

cat > docker-compose.override.yaml << EOF
version: '2.3'

services:

    node:
        env_file:
            - .env
        environment:
            - 'NODE_ENV=production'
            - 'USER=nobody'
        ports:
            - '3000:3000'
        read_only: true
        tmpfs:
            - '/.cache/yarn'
            - '/.yarn'
            - '/srv/build'
            - '/srv/node_modules:exec'
            - '/tmp'
EOF

docker-compose up -d
# Go to "http://localhost:3000/"
```

## Usage

### API

This example can be used with [the dedicated API](https://github.com/mauchede/example-api-platform-api-platform) (see branches `*/upload`)`.

## Contributing

1. Fork it.
2. Create your branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

## Links

* [api-platform/admin](https://github.com/api-platform/admin)
* [facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)
* [marmelab/admin-on-rest](https://github.com/marmelab/admin-on-rest)
* [mauchede/example-api-platform-api-platform](https://github.com/mauchede/example-api-platform-api-platform)
* [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
