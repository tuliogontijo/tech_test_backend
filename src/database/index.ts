import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'teste_shopper',
});

pool.connect();

export const query = async <T>(query: string, values: string[]): Promise<T[]> => {
  const { rows } = await pool.query(query, values);
  return rows;
};
