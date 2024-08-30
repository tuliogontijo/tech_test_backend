import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'teste_shopper',
});

pool.connect();

export const query = async <T>(query: string, values: string[]): Promise<T[]> => {
  const { rows } = await pool.query(query, values);
  return rows;
};
