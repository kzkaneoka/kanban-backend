# Kanban Board

## Project Overview

This project is a Kanban Board implementation like Trello.

![Screenshot](/trello.png)

## Features

- [ ] API Server
- [ ] TypeScript
- [ ] SQL
- [ ] Docker
- [ ] Test
- [ ] Error Handling

## Installation

```bash
(./backend)$ npm install
```

## Running the nest.js app

```bash
# development
(./backend)$ npm run start

# watch mode
(./backend)$ npm run start:dev

# production mode
(./backend)$ npm run start:prod
```

## Test

```bash
# unit tests
(./backend)$ npm run test

# e2e tests
(./backend)$ npm run test:e2e

# test coverage
(./backend)$ npm run test:cov
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
