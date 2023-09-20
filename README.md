# tech-assignment-md

## Description

API server that can be used to create, read, update and delete products with
activities.

## Running the project

I've provided a docker-compose file that will run the project and a postgres
database. To run the project, you need to have docker and docker-compose
installed.

```bash
docker-compose up
```

### Install dependencies

```bash
npm install
```

### Running dev (with nodemon)

```bash
 npm run dev
```

### Building

```bash
npm run build
```

## Testing

Simple test run:

```bash
npm run test
```

Run with coverage and keep a watch on the files (mostly to dev):

```bash
npm run test:watch
```

## TODO

-   Add more tests
-   Add Zod

## Overview

Acme Corporation is a large enterprise that produces a variety of products.
They want to create a set of APIs that allows them to maintain their products,
which are graphs of activities connected to one another.

A product has a name, a status and the list of activities that composes it.
The possible values for product statuses are **VALID** and **INVALID**.

An activity has a name and optionally input and /or output connections to other
activities on the same product. A connection between two activities have a
positive or negative value.

One activity only belongs to one product and changes on a product
should not affect others. A product should have the **VALID** status only when
it meets all of the constraints below:

-   It has at least one activity
-   It has only one final activity, which is an activity without
    output connections
-   I does not have duplicate connections. Ex, two connections
    from A → B.
-   It does not have circular dependencies, ex: A → B → C → A
-   All connections have values different than zero

The assessment’s goal is to design and build a set of APIs to CRUD products and
activities. There is no need to implement authentication so the APIs can be
public.

## Requirements

-   The APIs should be built using a recent version of TypeScript and Express.js.
-   The data should be persisted on PostgreSQL 15.
-   The APIs must have tests. Jest is preferred.
-   Use Docker Compose to run the api and database servers.
-   The assessment should be delivered as a private GitHub repository

## Bonus Points

-   Cache the data using Redis avoiding unnecessary queries.
-   Validate the API inputs using Zod, Yup or any other validation library.
-   Document the APIs using OpenAPI.
-   Setup a GitHub action to run the tests and build the Docker image when a PR
    is opened.
-   Use pgbouncer to pool connections instead of connecting directly to PostgreSQL

## Hints / Suggestions

-   Avoid unnecessary abstractions. Less is more. Simple is good. KISS.
-   Feel free to reach out for more information or make any assumptions as long
    as you can explain them later.
-   We are not looking for rocket scientists. We want pragmatic people, eager to
    work together, that can cut corners and still deliver good results.
