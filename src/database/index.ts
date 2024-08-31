import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST as string | 'localhost',
  port: Number(process.env.DB_PORT) | 5432,
  user: process.env.DB_USER as string | 'root',
  password: process.env.DB_PASSWORD as string | 'root',
  database: 'teste_shopper',
});

pool.connect();

export const query = async <T>(query: string, values: string[]): Promise<T[]> => {
  const { rows } = await pool.query(query, values);
  return rows;
};
