import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from 'routes/authRoutes';
import storeRoutes from 'routes/storeRoutes';
import transactionRoutes from 'routes/transactionRoutes';
import { requireAuth } from 'middleware/authMiddleware';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), '/public')));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({ origin: ['http://localhost:3000', 'http://192.168.100.12:3000'], credentials: true }),
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/auth', authRoutes);

app.use(requireAuth);

app.use('/api/stores', storeRoutes);
app.use('/api/transactions', transactionRoutes);
