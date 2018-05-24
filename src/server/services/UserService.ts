/**
 * Service interacting with users. Later, should also handle interacting with connections,
 * ie: create account with facebook, connect to calendars, etc.
 */

 // TODO: Do we need to abstract away the implementation and interface?
 // It would be nice in case we switch database providers, or handle
 // different types of users that need different functionality (ie: users sending statistics
import { getRepository } from 'typeorm';

// TODO: refactor into repository
import { User, Entry } from '../api/entity';


// TODO: get this from swagger description
/**
 * Input object from request
 */
interface UserInfo {
  username: string,
  name: string,
  bio: string,
  gender: string,
  dob: string
}

// interface UserValues {
//   username: string,
//   name: string,
//   dob: Date,
//   gender: string,
//   bio: string,
//   createdTime: Date,
//   entries: Entry[]
// }

function setUserValues(user: User, userValues: UserInfo) {

  // TODO: there has to be a better way to do this
  const {
    username,
    name,
    // TODO: find some way to parse Date
    dob,
    gender,
    bio
  } = userValues;

  user.username = userValues.username;
  user.name = userValues.name;
  user.dob = new Date(userValues.dob);
  user.gender = userValues.gender;
  user.bio = userValues.bio;
  user.createdTime = new Date(Date.now());
  user.entries = [];
}

export default class UserService {
  constructor() {
    // TODO: whatever needed to connect database
  }

  createUser(userInfo: UserInfo) {

    const user = new User();
    setUserValues(user, userInfo);

    return getRepository(User).insert(user);
  }

  getUser(id: string) {
    return getRepository(User).findOne(id);
  }

  updateUser(userId: string, userInfo: Partial<UserInfo>) {
    // TODO: update user
    return null;
  }

}
