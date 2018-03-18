import * as mongoose from 'mongoose';

interface Task {
  text: []
}

interface Entry extends mongoose.Document {
  id: string,
  name: string,
  // TODO: move these to generic interface and have other models extend it
  creationDate: Date,
  tasks: Task[],
  modifiedDate: Date
}

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: false
  },
  modifiedDate: {
    type: Date,
    required: false
  }
}).pre('save', (next) => {
  if (this._doc) {
    let doc = <IUserModel>this._doc;
    let now = new Date();
    if (!doc.creationDate) {
      doc.creationDate = now;
    }
    doc.modifiedDate = now;
  }
  next();
  return this;
});

const UserModel = mongoose.model<IUserModel>('Users', UserSchema);
export default UserModel;

// TODO: move to new model file
// interface ILog extends mongoose.Document {
//   id: string,
//   userId: string,
//   date: Date,
//   text: string
// }

// const LogSchema = new Schema({
//   id: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   text: {
//     type: String,
//     required: true
//   }
// });

// export const Log = new mongoose.model<ILog>('Log', LogSchema);
