import { Pool } from "pg";
import env from "../env";

const pool = new Pool({
    // host: 'localhost',
    // user: 'postgres',
    // password: env.DB_PASSWORD,
    // port: 5432,
    // database: env.DB_NAME
    connectionString: env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export default pool