import { Router } from 'express';
import * as bodyParser from 'body-parser';
import { getRepository } from 'typeorm';

import { User, Entry } from '../../entity/';
import UserService from '../../../services/UserService';
import EntryService from '../../../services/EntryService';

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

// TODO: put this somewhere accessible

const _USER_SERVICE = new UserService();
const _ENTRY_SERVICE = new EntryService();

router.post('/', (request, response) => {
  console.log(request);
  const { username, name, dob, gender='U', bio='' } = request.body;
  const userInfo = { username, name, dob, gender, bio };
  
  _USER_SERVICE.createUser(userInfo).then((value: any) => {
    const output = JSON.stringify({
      status: 'SUCCESS',
      value: value
    })
    response.status(201).send(output);
  }).catch((error: any) => {
    response.status(400).send(JSON.stringify({
      status: 'ERROR',
      value: error
    }));
  });
});

/**
 * Get information about a user.
 */
router.get('/:id', (request, response) => {
  console.log(request.body);
  _USER_SERVICE.getUser(request.params.id).then((user: User) => {
    if (!user) {
      const errorMsg = `User with id ${request.params.id} not found.`;
      console.log(errorMsg);
      response.status(404).send(errorMsg);
    } else {
      const userInfo = JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        // TODO: always return dob in a secure way from database
        dob: user.dob,
        gender: user.gender,
        createdTime: user.createdTime,
        bio: user.bio
      });

      response.status(200).send(userInfo);
    }
  }).catch((error: any) => {
    // TODO: Create a common error message class
    response.status(500).send(`Error: "${error}".`);
  });
});

/**
 * Get a list of user entries.
 */
router.get('/:id/entries/', (request, response) => {
  console.log(request.body);
  _ENTRY_SERVICE.getEntriesShort(request.params.id).then(entries => {
    response.status(200).send(JSON.stringify({
      entries
    }));
  }).catch((error: any) => {
    response.status(500).send(`Error: "${error}".`);
  });
  
});

/**
 * Create new user entry
 */
router.post('/:id/entries/', (request, response) => {
  console.log(request.body);
  const { author, created, published, title, text } = request.body;
  const entryValues = { author, created, published, title, text };
  _ENTRY_SERVICE.createEntry(request.params.id, entryValues).then(() => {
    response.status(201).send('SUCCESS');
  }).catch((error: any) => {
    response.status(500).send(`Error: "${error}".`);
  });
});

export default router;
