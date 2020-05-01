import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import userRoute from './src/routes/user';
import businessRoute from './src/routes/business';
import reviewRoute from './src/routes/review';
import categoryRoute from './src/routes/category';
import swaggerDocument from './../swagger.json';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(`${__dirname}/../public/`));
app.use(
  '/api-docs/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use('/api/v1', userRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/businesses', businessRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/*', (req, res) => res.status(404).json({
  message: 'Route not available'
}));

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port);

export default app;
