const express = require('express');
const cors = require('cors');
const { Client } = require('pg')
require('dotenv').config();
const connectionData = require('./config.js');
const validateOrder = require('./middleware/validateOrder');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client(connectionData);
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

app.post('/api/test', validateOrder, async (req, res) => {
    try {
        const { customer_name, favorite_coffee, size, milk_type, payment_method, rating } = req.input;
        const data = await client.query(
            `INSERT INTO orders (customer_name, favorite_coffee, size, milk_type, payment_method, rating)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [customer_name, favorite_coffee, size, milk_type, payment_method, rating]
        );
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json('Intentalo más tarde, gracias...');
    }
});

app.get('/api/test', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM orders ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json('Intentalo más tarde, gracias...');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
