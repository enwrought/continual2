import * as express from 'express';
import UserController from '../controllers/UserController';
import * as bodyParser from 'body-parser';

const app = express();

app.use('/users', bodyParser.json(), UserController);

export default app;
