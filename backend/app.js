import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import users from './routes/users.js';
import healthLogRoutes from './routes/healthLogRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', users);
app.use('/healthlogs', healthLogRoutes);

const setup = async () => {
  const petRoutes = (await import('./routes/pets.js')).default;
  app.use('/pets', petRoutes);
};

await setup();

export default app;
