# Encrypt Api 🔒🔑🔑🔓
## Software
```
Docker version 20.10.2, build 20.10.2-0ubuntu1~20.04.2
docker-compose version 1.27.4, build 40524192
```
There shouldn't be any troubles with a newer docker version.
## Setting up
```
cp .env.dist .env
docker-compose up -d
``` 
Feel free to customize .env file for your needs.
### Container shell
After project running:
```
docker-compose exec main /bin/bash
```
## Testing
In container shell. For unit/integration tests
```
npm run test
```
For e2e tests:
```
npm run test:e2e
```
## User Mocks
```
emailAddress: jackstone@gmail.com
plainPassword: correcthorsebatterystaple

emailAddress: johndoe@yahoo.com
plainPassword: qwerty4321

emailAddress: bon321@gmail.com
plainPassword: asdfasdf1234
```
## Docs
TODO: Swagger
## TODO
- Better exception system: mapping from domain to http
- Research & implement AES encryption
- Remove in-memory stores (mongo 🥬, mysql 🐬)
- Better store for keys (Vault by HashiCorp?)
- Key pair generating and file encryption in async processing (BullMQ 🐮, RabbitMQ 🐰)
- Remove Nest.js 💀
- ...
