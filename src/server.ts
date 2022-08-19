import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const bodyParser = require('body-parser');

import './database';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
    console.log('Server started Jalves espetaria!');
});
