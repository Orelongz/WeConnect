import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './src/routes/index';
import businessRoute from './src/routes/business';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', indexRoute);
app.use('/api/v1/businesses', businessRoute);

app.listen(8080);

export default app;
