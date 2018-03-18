import { Router } from 'express';
import * as bodyParser from 'body-parser';
import User from '../models/UserModel';
import { v4 as uuid } from 'uuid';

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (request, response) => {
  console.log(request);
  const user = new User({
    id: uuid(),
    name: request.body.name
  });
  user.save((err, saved) => {
    if (err) {
      console.log(err);
    } else {
      // TODO: must create functions to access User? maybe log success?
    }
  })
  response.status(201).send('not implemented');
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
