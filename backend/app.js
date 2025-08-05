import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import users from './routes/users.js';
import healthLogRoutes from './routes/healthLogRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', users);
app.use('/healthlogs', healthLogRoutes);
app.use('/medications', medicationRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/food', foodRoutes);
app.use('/vaccines', vaccineRoutes);

const setup = async () => {
  const petRoutes = (await import('./routes/pets.js')).default;
  app.use('/pets', petRoutes);
};

await setup();

export default app;
