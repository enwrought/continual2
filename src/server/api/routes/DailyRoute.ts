import * as express from 'express';
import * as bodyParser from 'body-parser';

import UserController from '../controllers/users/UserController';

const app = express();

app.use('/users', bodyParser.json(), UserController);
// app.use('/entries', bodyParser.json(), EntryController);

export default app;
