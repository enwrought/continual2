
interface UserInfo {
  name: string;
  username: string;
  dob?: Date;
}

interface Entry {
  title: string;
  text: string;
}

// TODO: merge types with server somehow
// TODO: divide into the states corresponding to each reducer
// TODO: decide on policy on what is stored in the state. This likely needs to be PWA-like
export interface ClientReduxStore {
  // TODO: if needed, split to diary/calendar/other
  server: {
    status: string,
  };
  user: UserInfo;
  entries: {
    [key: string]: Entry;
  };
  drafts: {
    [key: string]: Entry;
  };
  /**
   * Key of the last edited draft in drafts
   */
  latest_draft: string;
}
