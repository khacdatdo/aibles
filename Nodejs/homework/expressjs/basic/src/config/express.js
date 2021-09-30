import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// cors  configuration
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Authorization', 'Accept-Language'],
    credentials: true,

};

app.use(cors(corsOptions));
app.use('/api/v1', router);

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
