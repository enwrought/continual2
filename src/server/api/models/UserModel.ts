// TODO: can we move this and make it available to the client if needed?

export interface User {
  name: string;
  username: string;
  dob?: Date;
  gender?: string;
  bio?: string;
}

export enum PredicateType {
  EQUALS = 'EQUALS',
  STARTS_WITH = 'STARTS_WITH',
  CONTAINS = 'CONTAINS'
}

export interface UserPredicate {
  type: PredicateType;
  name?: string;
  username?: string;
  dob?: Date;
};
