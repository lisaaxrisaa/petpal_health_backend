import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import users from './routes/users.js';
import petRoutes from './routes/pets.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', users);
app.use('/pets', petRoutes);

export default app;
