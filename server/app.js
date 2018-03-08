import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './src/routes/index';
import businessRoute from './src/routes/business';
import reviewRoute from './src/routes/review';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', indexRoute);
app.use('/api/v1/businesses', businessRoute);
app.use('/api/v1/businesses/:businessId/reviews', reviewRoute);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to WeConnect'
}));
app.all('*', (req, res) => res.status(404).json({
  message: 'Page not Found'
}));

export default app;
