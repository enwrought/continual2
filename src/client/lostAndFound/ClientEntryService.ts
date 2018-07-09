// Note: this is more of a playground of how a dispatcher model would look
// Will revisit if we need some state management with entries that needs to be
// recomputed on initialization and can't be stored in redux? or some other functionality
// other than dispatching actions.

// import { put } from 'redux-saga/effects';

// TODO: merge Entry + other types shared with server
interface Entry {
  date: Date;
  title: string;
  text: string;
}

// TODO: should we save the 
interface ClientEntryService {
  // loadEntry: (entryId: string) => Entry;
  loadAllEntries: () => void;
  createEntry: () => void;
}

// TODO: does this provide value, ie: will there be more than one place we call any of the functions?
// or, do these functions execute more than one action?
// or, do we do anything else (like keep track of entries/latest draft) that we need this?
class ClientReduxEntryServiceImpl implements ClientEntryService {
  // TODO: this should depend on User being loaded... but we can also just depend on the store
  //       having the user information and/or delay on the saga/reducer until it the user info
  //       is loaded.

  loadAllEntries() {
    // TODO: implement
    // put({});
  }

  createEntry() {
    // TODO: we need access to the dispatcher from the store
    // put({ type: 'CREATE_NEW_ENTRY' });
  }
}

// This is how it might be hooked into a connected component

// export const withCreateEntry = withProps(() => {
//   return {
//     saveToServer: clientEntryService.createEntry
//   };
// });

// const enhance = compose(
//   connect<PropsFromReduxState, PropsFromDispatch, void>(
//     (state: GlobalState) => {
//       console.log(state);
//       return {
//         initValue: state.content
//       };
//     }
//   ),
//   withCreateEntry
// );

// const FormattingTextbox = enhance(FormattingTextboxChild);

export const clientEntryService = new ClientReduxEntryServiceImpl();
