const express = require('express');
const cors = require('cors');
const router = require('./routes/v1');

// //swagger 
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('../config/swagger');

// // Swagger UI setup
// router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', router);

module.exports = app;
