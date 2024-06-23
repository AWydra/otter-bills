import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from 'routes/authRoutes';
import storeRoutes from 'routes/storeRoutes';
import { requireAuth } from 'middleware/authMiddleware';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
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
