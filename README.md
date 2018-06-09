# README
This is a work in progress of a simple app to post entries, and a playground for
exploring libraries and whatnot.

# Running
To run everything at once, first install node modules and symlink common libraries.
```
lerna bootstrap
lerna prepare
lerna bootstrap --hoist
```

Then run both client and server.
```
lerna run start --stream
```

# Information

## Server
Please see the [Server README](./src/server/README.md).

## Client
There is not much more than templates set up at the moment. It also compiles, but is currently broken.
For running, please see the
[Client README](./src/client/README.md).
