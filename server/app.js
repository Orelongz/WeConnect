import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {
  userRoute,
  businessRoute,
  reviewRoute
} from './src/routes';
import swaggerDocument from './../swagger.json';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  '/api-docs/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use('/api/v1', userRoute);
app.use('/api/v1/businesses', businessRoute);
app.use('/api/v1/businesses/:businessId/reviews', reviewRoute);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to WeConnect'
}));

app.all('*', (req, res) => res.status(404).json({
  message: 'Page not Found'
}));

export default app;
