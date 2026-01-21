
require('dotenv').config({path: '../.env'});
const app = require('./app');
const { connectToDatabase } = require('./models/ConnectionModel');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
