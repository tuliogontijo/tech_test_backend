import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'test_shopper',
});

pool.connect();

exports.query = async (
  query: string,
  values: string[],
): Promise<string | string[]> => {
  const { rows } = await pool.query(query, values);
  return rows;
};
