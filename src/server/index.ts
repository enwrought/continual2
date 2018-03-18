import './db';
import app from './api/routes/DailyRoute';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json({ strict: false, type: "*/json" }));

app.listen(port, (error: any) => {
  if (error) {
    console.error(error);
  }
});


console.log(`Started server on port ${port}.`);
