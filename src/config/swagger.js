// src/docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Colori API',
      version: '1.0.0',
      description: 'Documentação da API de usuários',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['../../routes/v1/*.js'], // onde estão os comentários
};

module.exports = swaggerJSDoc(options);
