import postgres from 'postgres';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const sql = postgres(process.env.POSTGRES_CONNECTION!); // will use psql environment variables

export default sql;
