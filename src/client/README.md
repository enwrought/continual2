
There is not much here except a dummy page with some dummy routing to tags.

- [Get started](#get-started)
- [Infrastructure](#infrastructure)
- [Flow and Design notes](#flow-and-design-notes)
- [Requirements](#requirements)

# Get started
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

# Infrastructure
TODO: expand this. It is currently a SPA on webpack + typescript + sass. Tests are through jest.

# Flow and Design notes
The current flow is influenced by the idea of having Redux as the single source of and all state. On startup,
we dispatch a call to the server to load the user and entry information.  All subsequent calls rely on the state
of redux, ie: components are rendered via state in redux, 

This might need to change going forward. See potential shortcomings, ramblings, etc in 
[miscellaneous client thoughts](./random.md).

# Requirements
The UX and requirements are still being defined, but in general the applications should consider some minimum set of concerns.
1. Show information clearly and be intuitive to use.
2. Reduce the amount and difficulty of user input. This includes using smart defaulting when possible and/or the data is available, 
   and making things easier to use, without too much typing.
3. Make the user comfortable. In particular, it needs to be clear that data is saved properly, and precisely what data (if any) is shared.
4. Offline/failure-resistent - ie: if a server is out, the application should still work with what information is saved in localstorage. Requests
   can still be made, but it is clear that the information is not saved on the server, but will be as soon as you are online. Localstorage + PWA work are still TODOs for this.
