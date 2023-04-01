import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/tasks/task.entity';
import { taskRouter } from './src/tasks/task.router';

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 8001;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    entities: [Task],
    synchronize: true,
});

app.use(bodyParser.json());

app.use(cors());

AppDataSource.initialize()
    .then(() => {
        console.log('Database has been initilize');
        app.listen(PORT);
    })
    .catch((err) => {
        console.log('Unable to connect to DB', err);
    });

app.use('/', taskRouter);
