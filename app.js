import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import userRoute from './server/src/routes/user';
import businessRoute from './server/src/routes/business';
import reviewRoute from './server/src/routes/review';
import swaggerDocument from './swagger.json';
import webpackConfig from './webpack.config';

const app = express();
const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, '/client/public/')));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

export default app;
