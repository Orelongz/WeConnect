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
import categoryRoute from './server/src/routes/category';
import swaggerDocument from './swagger.json';
import webpackConfig from './webpack.config';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
const compiler = webpack(webpackConfig);

app.use(express.static(`${__dirname}/client/public`));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
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
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/businesses', businessRoute);
app.use('/api/v1/reviews', reviewRoute);

const indexHTMLPath = path.join(__dirname, '/client/public/index.html');
app.get('/*', (req, res) => res.sendFile(indexHTMLPath));

app.listen(port);

export default app;
