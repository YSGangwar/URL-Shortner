const app = require('./app');
const pool = require('./src/utils/postrgredb');
const config = require('./src/config/config');
let server ;

pool.connect((err, client) => {
    if (err) {
      return console.error('Error connecting to PostgreSQL:', err.stack);
    }
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
  });


const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
  