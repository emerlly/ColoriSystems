const express = require('express');
const cors = require('cors');
const router = require('./routes/v1');

//swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI setup
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

module.exports = app;
