import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './src/routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', indexRoute);

app.listen(8080);

export default app;
