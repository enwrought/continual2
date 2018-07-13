This is a place for me to store unorganized thoughts and figure things out, and is not meant to make any sense or be particularly useful :P

- [Redux/saga-centric design/TODOs](#reduxsaga-centric-designtodos)
  - [Deal with asynchronous requests](#deal-with-asynchronous-requests)
  - [Deal with unavailable](#deal-with-unavailable)

# Redux/saga-centric design/TODOs
The current design uses the Redux store as the source of truth, with redux-saga/actions
as a an indirect way of interacting with
other parts of the application. This does make things somewhat easier to test and develop
parts independently. For instance, most requests to entry endpoints require user information/authentication.
Instead of acquiring that information from the store and making request, just signal that what
request we would like to make.  Then, saga middleware will retrieve the necessary entry and user information from the
store and make the request.

Some cases where this is more difficult is we may have to take more care dealing with asynchronous requests
or handle cases where state is unavailable/pending/etc.

## Deal with asynchronous requests
Regarding asynchronous requests, we need to have some management to handle somewhat indirect access of data.  For instance, suppose we want to save a diary entry and publish when we click a button.
Then, we need to wait for the save to complete before sending the publish call. If the save portion is slow, we may send the publish call with data prior to saving. So in this case, the save + publish needs to be a single action.

Further, if before the call is sent, we continue typing and autosave the information. In this case, we need to store state indicating that state is uneditable (and reflect this in the UX).

This is uncomfortably indirect that it seems possibly that making the call directly instead
of putting "blocks" on changing state may be easier to manage. Perhaps something like a single call compiles all the necesary information at a particular time before making a call. This couples actions more closely with knowledge of the state, however.

## Deal with unavailable 
Because of this, we need to store the "state of the server requests", in particular since
no part of the application has any knowledge of other ongoing requests.