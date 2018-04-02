import { GenericRepositoryBase, DBArgs, DatabaseResultInfo } from './GenericRepositoryBase';
import { User, UserPredicate, PredicateType } from '../models/UserModel';
import * as mysql from 'mysql2';
import * as uuid from 'uuid';
import * as moment from 'moment';

// TODO: do we need the concept of impls and services? ie at least for testing,
// local, and production

type UserDatabaseResultInfo = DatabaseResultInfo & User;

type PredicatePair = [string, any[]];
// TODO: make this generic predicate type, ie: with predicate a predicate + template and ids only fields of template
// TODO: also, can we generalize this for non-equals?
function combine_predicates(predicate: UserPredicate, ids: string[]): PredicatePair {
  const prepared_statement = ids.reduce((memo: PredicatePair, id, index) => {
    const [curr_statement, curr_args] = memo;

    let new_statement: string = '';
    let new_args: any[] = [];
    if (curr_statement && predicate[id]) {
       new_statement = `${curr_statement} AND \`${id}\`=?`;
       new_args = [...curr_args, predicate[id]];
    } else {
      new_statement = curr_statement || predicate[id];
      new_args = curr_args;
    }
    const result: PredicatePair = [new_statement, new_args];
    return result;
  }, ['', []]);
  return prepared_statement;
}

export default class UserRepository implements GenericRepositoryBase<UserDatabaseResultInfo, UserPredicate> {
  // TODO: make this static???
  _name = 'User';
  _pool: any = undefined;

  // TODO: pass pool instance instead of args?
  constructor(dbArgs: DBArgs) {
    const args = {
      host: 'localhost',
      databse: this._name,
      // TODO: how do these parameters affect performance???
      connectionLimit: 10,
      queueLimit: 10,
      // TODO: do I need other args, or ssl?
      ...dbArgs
    }
    this._pool = mysql.createPool(args);
    // this._pool.connect((err: any) => {
    //   if (err) {
    //     // TODO: find some better way of logging...
    //     console.log(`Error connecting to pool with args ${args}.`);
    //   } else {
    //     console.log('Connected to mysql pool.')
    //   }
    // });
    this._pool.on('acquire', (connection: mysql.Connection) => {
      console.log(`Connection acquired! Object: ${connection}.`);
    });
  }

    // TODO: move this out into class later if needed
  _run_prepared_statement(statement: string, args: any[]): Promise<UserDatabaseResultInfo[]> {
    return new Promise((resolve, reject) => {
      this._pool.getConnection((err: any, connection: mysql.Connection) => {
        // connection.connect();
        if (err) {
          console.log({err});
          reject(err);
        } else {
          connection.execute(statement, args, (error, results: UserDatabaseResultInfo[], fields) => {
            if (error) {
              reject(error);
            }
            resolve(results);
            console.log({results, fields});
            // TODO: add in the fields and maybe revisit DatabaseResult wrapper
          });
          connection.end();
        }
      });
    });
  }

  get(id: string): Promise<UserDatabaseResultInfo[]> {
    return this._run_prepared_statement('Select * from Users where `id`=?;', [id]);
  }

  find(predicate: UserPredicate): Promise<UserDatabaseResultInfo[]> {
    let statement = 'SELECT * FROM Users WHERE ';
    let args: any[] = [];
    switch (predicate.type) {
      // TODO: implement CONTAINS and STARTS_WITH
      case PredicateType.CONTAINS:
        console.log('CONTAINS not yet supported, running as EQUALS');
      case PredicateType.STARTS_WITH:
        console.log('STARTS_WITH not yet supported, running as EQUALS');
      case PredicateType.EQUALS:
      default:
        const [add_to_statement, add_to_args] = combine_predicates(predicate, ['name', 'id', 'dob']);
        statement += add_to_statement;
        args = [...args, ...add_to_args];
    }

    return this._run_prepared_statement(statement, args);
  }

  insert(obj: User): Promise<UserDatabaseResultInfo[]> {
    // TODO: validation?
    const { username, name, dob: _dob=(new Date()), gender='_', bio='' } = obj;

    const dob = moment(_dob).format('YYYY-MM-DD HH:mm:ss');
    console.warn('Insert not implemented!');
    const id = uuid.v4();
    // TODO: generalize function for insert?
    return this._run_prepared_statement(
      'INSERT INTO Users (id, name, username, gender, dob, bio)'
      + ' values (?, ?, ?, ?, ?, ?);',
      [
        id,
        name,
        username,
        gender,
        dob,
        bio
      ]
    );
  }

  delete(obj: User): Promise<UserDatabaseResultInfo[]> {
    console.warn('Delete not implemented!');
    return this._run_prepared_statement('Select 1', []);
  }
}
