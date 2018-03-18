import RepositoryBase from './RepositoryBase';
import { UserSchema, IUserModel } from '../models/DailyModel';

// TODO: do we need the concept of impls and services? ie at least for testing,
// local, and production
export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}