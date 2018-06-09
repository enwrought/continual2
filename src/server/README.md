# Server
Work in progress of a REST server to create and modify users and entries. This relies
on the [NestJS framework](https://github.com/nestjs/nest) and [TypeORM](https://github.com/typeorm/typeorm).

## Prerequisites
In order to run the server, you must first satisfy the following additional requirements.
* Have mysql installed (or modify DiaryModule.ts for some other installed database).
* Edit your .env file for the typeorm configuration options.  These options include
  - database: name of your database
  - host: host endpoint for database.  Default 'localhost'.
  - username: username to log into database (for now, should have all privileges). Default 'root'.
  - password: password to log into database.  Default 'root'.
  - PORT: port for endpoint.  Default 3000.
* Currently for the limited testing, create a 'test' database.

## Running
To start off the server, first do
```
lerna bootstrap --hoist
lerna prepare
```
followed by
```
lerna run start --scope server --stream
```
This will start the server locally on the port specified,
with the default http://localhost:3000/.  Some Swagger API documentation is generated and available
at http://localhost:3000/api.

To run the tests, run 
```
lerna run test --scope server --stream
```
