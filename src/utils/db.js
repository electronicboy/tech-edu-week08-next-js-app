import pg, {Pool} from 'pg'

/** @type {Pool | null} */
let conn = null;

export function db() {
    if (conn == null || conn.ended) {
        conn = new pg.Pool({
            connectionString: process.env.DATABASE_URL,
        })
    }
    return conn;
}
