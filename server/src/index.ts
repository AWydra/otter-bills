import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
