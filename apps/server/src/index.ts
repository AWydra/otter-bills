import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from 'routes/authRoutes';
import { requireAuth } from 'middleware/authMiddleware';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

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

app.use(authRoutes);

app.use(requireAuth);
