# Kanban Backend

## Project Overview

Kanban backend is a Trello backend clone in NestJS.

![Screenshot](/trello.png)

## Features

- [x] API Server
- [x] TypeScript
- [x] SQL
- [x] Global Logger
- [x] Input Validation
- [x] Global Error Handling
- [x] Authentication & Authorization
- [x] Email Confirmation
- [x] Swagger Documentation
- [ ] Config
- [ ] Test
- [ ] Docker
- [ ] CI/CD

## Install

```bash
$ npm install
```

## Setup Database

```bash
$ docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres:13.2-alpine
$ docker exec -it pg-docker bash
$ psql -U postgres
$ CREATE DATABASE kanban_dev;
$ \q
$ exit
$ npx knex migrate:latest
$ npx knex seed:run
```

## Run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Design

![Screenshot](/db-design.png)

## User Stories

User can signup/login with username, email, and password

User can add/update column with name

User can delete empty column

User can update column order

User can add card to column with name and description

User can modify card details

User can identify / switch status of card

User can update card order

User can archive card

## API Documentation

After running nest js app, visit [http://localhost:3000/api/v1/docs](http://localhost:3000/api/docs).
