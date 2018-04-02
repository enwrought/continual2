import { Router } from 'express';
import * as bodyParser from 'body-parser';
// import { User } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';
import { v4 as uuid } from 'uuid';

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

const userRepo = new UserRepository({
  host: process.env.host || 'localhost',
  database: process.env.database || '',
  user: process.env.user || '',
  password: process.env.password || ''
});

router.post('/', (request, response) => {
  console.log(request);
  const user = {
    id: uuid(),
    name: request.body.name,
    username: request.body.name
    // TODO: gender, bio, dob?
  };
  // user.save((err, saved) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // TODO: must create functions to access User? maybe log success?
  //   }
  // })
  userRepo.insert(user).then((value) => {
    response.status(201).send(`Successfully updated with response ${JSON.stringify(value)}.`);
  }).catch((error) => {
    response.status(400).send(`Failed with error ${error}.`);
  });
});

router.get('/', (request, response) => {
  // TODO: implement
  response.status(200).send('hello!');
});

router.get('/:id', (request, response) => {
  console.log(request.body);
  // Users.create({
  //   name: request.body.name
  // });
  response.status(200).send('not implemented');
});

export default router;
