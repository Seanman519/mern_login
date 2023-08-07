// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan());
app.disable('x-powered-by');

const port = 8080;

// HTTP GET REQUEST
app.get('/', (req, res) => {
  res.status(201).json('Home GET Request');
});

// Start server only when we have a valid connection
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Cannot connect to the server');
  });
