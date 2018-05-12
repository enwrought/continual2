import { Router } from 'express';
import * as bodyParser from 'body-parser';
import { getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../entity/User';

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

// TODO: put this somewhere accessible
interface UserValues {
  username: string,
  name: string,
  dob: Date,
  gender: string,
  bio: string,
  createdTime: Date
}

function setUserValues(user: User, userValues: UserValues) {
  user.username = userValues.username;
  user.name = userValues.name;
  user.dob = userValues.dob;
  user.gender = userValues.gender;
  user.bio = userValues.bio;
  user.createdTime = userValues.createdTime;
}

router.post('/', (request, response) => {
  console.log(request);
  const { username, name, dob, gender='U', bio='' } = request.body;

  // TODO: there has to be a better way to do this
  const userValues = {
    // id: uuid(),
    username,
    name,
    // TODO: find some way to parse Date
    dob: new Date(dob),
    gender,
    bio,
    createdTime: new Date(Date.now())
  };

  const user = new User();
  setUserValues(user, userValues);

  getRepository(User).insert(user).then((value: any) => {
    const output = JSON.stringify({
      status: 'SUCCESS',
      value: userValues
    })
    response.status(201).send(output);
  }).catch((error: any) => {
    response.status(400).send(JSON.stringify({
      status: 'ERROR',
      value: error
    }));
  });
});

router.get('/', (request, response) => {
  // TODO: determine how to restrict users. Do we really want to show all users?
  // or just make this an internal endpoint of some kind?
  getRepository(User).find().then(users => {
    const output = JSON.stringify({
      status: 'SUCCESS',
      users
    });
    response.status(200).send(output);
  }).catch((error: any) => {
    response.status(400).send('')
  });
  
});

router.get('/:id', (request, response) => {
  console.log(request.body);
  response.status(200).send('not implemented');
});

export default router;
