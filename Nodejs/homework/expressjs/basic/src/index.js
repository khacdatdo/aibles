import dotenv from 'dotenv';
import app from './config/express';

dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;

// listen to requests
app.listen(port, () => `server started on port ${port} (${env})`);

module.exports = app;
