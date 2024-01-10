# INTERVIEW TEST CASE : Mini CRM

**GOAL:** Build a secure API endpoint in NodeJs\
**TASK:** [TASK.md](TASK)\
**DISCUSSION:** [DISCUSSION.md](DISCUSSION)

## Tech stack

This project uses the [Nest](https://github.com/nestjs/nest) framework (with Typescript) for backend and
postgres (via TypeORM) for storage

The project works with a dockerized db for dev and testing

## Installation

```bash
# Install dependencies
$ yarn install
```

Install docker compose with the method of your choice.

```bash
# Setup the db and applies migration
$ make setup-db
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

This project is distributed under the [MIT license](LICENSE).
