import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from 'routes/authRoutes';
import { requireAuth } from 'middleware/authMiddleware';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

if (!process.env.MONGODB_CONNECTION) {
  throw new Error('MongoDB connection string missing');
}

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    dbName: 'otterbills',
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api', authRoutes);

app.use(requireAuth);
