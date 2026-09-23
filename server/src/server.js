import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import Plant from './models/Plant.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// app.use(cors());
app.use(express.json());

try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Plant Tracker API');
});

app.get('/health', (req, res) => {
    res.send({status: 'ok'});
});

//read all plants
app.get('/api/plants', async (req, res) => {
    try {
        const search = req.query.search || '';
        const sortOption = req.query.sort || '';

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { species: { $regex: search, $options: 'i' } },
                    { location: { $regex: search, $options: 'i' } }
                ]
            };
        }

        let sortObj = {};
        if (sortOption === 'name_asc') sortObj = { name: 1 };
        else if (sortOption === 'last_watered_asc') sortObj = { last_watered: 1 };
        else if (sortOption === 'frequency_asc') sortObj = { watering_frequency: 1 };
        else if (sortOption === 'date_added_desc') sortObj = { date_added: -1 };

        const plants = await Plant.find(filter).sort(sortObj);
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend router live at http://localhost:${PORT}`);
});
