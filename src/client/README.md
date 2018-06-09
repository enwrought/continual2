# Client
There is not much here except a dummy page with some dummy routing to tags.
This app is currently broken on edit, likely because of trying to set state
while some part of the component is re-rendering.

## Run just the client.
First install required node modules. The client depends on 'lib' to be built
and linked.
```
lerna bootstrap
lerna prepare
lerna bootstrap --hoist
```
Run the following command to start the client.  It will be located on http://localhost:8080/.
```
lerna run start --scope client --stream
```
