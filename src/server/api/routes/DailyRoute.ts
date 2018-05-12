import * as express from 'express';
// import UserController from '../controllers/UserController';
import RoutingUserController from '../controllers/RoutingUserController';
import * as bodyParser from 'body-parser';

const app = express();

app.use('/users', bodyParser.json(), RoutingUserController);

export default app;
