# Kanban Backend

## Project Overview

Kanban backend is a Trello backend clone in NestJS.

![Screenshot](/trello.png)

## Features

- [x] API Server
- [x] TypeScript
- [x] Logger
- [x] Validation
- [ ] Error Handling
- [ ] Auth
- [ ] Test
- [ ] Swagger
- [x] SQL
- [ ] Docker

## Install

```bash
# install dependencies
$ npm install
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

### Model: Column

- Fields: ID, Name, Order

### Model: Card

- Fields: ID, Column ID, Name, Description, Created date, Updated date, Order, Status(for archiving)

### User Stories

User can add/update column with name

User can delete empty column

User can update column order

User can add card to column with name and description

User can modify card details

User can identify / switch status of card

User can update card order

User can archive card
