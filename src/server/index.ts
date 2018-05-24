import './db';
import app from './api/routes/DailyRoute';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { createConnection } from 'typeorm';
import { Entry, Tag, User } from './api/entity';

const port = process.env.PORT || 3000;


const connection = createConnection({
  type: 'mysql',
  host: process.env.host || 'localhost',
  port: 3306,
  username: process.env.username || '',
  password: process.env.password || '',
  database: process.env.database || '',
  entities: [
    Tag,
    Entry,
    User
  ],
  synchronize: true,
  logging: false
});

app.use(bodyParser.json({ strict: false, type: '*/json' }));

app.listen(port, (error: any) => {
  if (error) {
    console.error(error);
  }
});


console.log(`Started server on port ${port}.`);
