const { Client } = require('pg');
require('dotenv').config();
const connectionData = require('./config.js');

const client = new Client(connectionData);
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

async function migrate() {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                customer_name TEXT NOT NULL,
                favorite_coffee TEXT NOT NULL,
                size TEXT NOT NULL,
                milk_type TEXT NOT NULL,
                payment_method TEXT NOT NULL,
                rating INTEGER NOT NULL
            );
        `);
        console.log('Migration completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}


migrate();