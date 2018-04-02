import * as mysql from 'mysql2';
// TODO: Do we need this wrapped type?
// export interface DatabaseResult<T> {
//   createdDate         : Date;
//   modifiedDate        : Date;
//   deleted?            : boolean;
//   success             : boolean;
//   // TODO: do we need other metadata?
//   entry?              : T;
// }

export interface DatabaseResultInfo extends mysql.RowDataPacket {
  createdDate            : Date;
  modifiedDate           : Date;
}

// This seems unnecessary since we need to grab the created timestamp from the result anyways...
// export function <T> createDatabaseResult(result: T, success=true): DatabaseResult<T> {
//   return {
//   }
// }

export interface GenericRead<T extends DatabaseResultInfo, P> {
  // get(id: String)     : Promise<DatabaseResult<T>>;
  // find(predicate: P)  : Promise<DatabaseResult<T>[]>;
  find(predicate: P)     : Promise<T[]>;
  get(id: String)        : Promise<T[]>;
}

export interface GenericWrite<T extends DatabaseResultInfo> {
  insert(obj: T)         : Promise<T[]>;
  delete(obj: T)         : Promise<T[]>;
}

export interface DBArgs {
  host                   : string;
  user                   : string;
  password               : string;
  database               : string;
}

type GenericReadWrite<T extends DatabaseResultInfo, P> = GenericRead<T, P> & GenericWrite<T>;

export interface GenericRepositoryBase<T extends DatabaseResultInfo, P> extends GenericReadWrite<T, P> {
  _name                  : string;
}
