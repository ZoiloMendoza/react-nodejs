const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/test', async (req, res) => {
    try {
        setTimeout(() => {
            res.status(201).json({ message: 'testing post' });
            console.log('testing post');
        }, 1000);
    } catch (error) {
        console.error(error);
        res.status(500).json('Intentalo más tarde, gracias...');
    }
});

app.get('/api/test', async (req, res) => {
    try {
        res.json({ message: 'testing get' });
    } catch (error) {
        console.error(error);
        res.status(500).json('Intentalo más tarde, gracias...');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
