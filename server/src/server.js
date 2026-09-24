import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Plant from './models/Plant.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
}
// Middleware
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',')
    : ['http://localhost:5173'];

if (process.env.CLIENT_URL) {
    // If Render has a CLIENT_URL, split it and add those origins too
    const envOrigins = process.env.CLIENT_URL.split(',').map(url => url.trim());
    allowedOrigins.push(...envOrigins);
}
app.use(cors({ origin: allowedOrigins, credentials: true, optionsSuccessStatus: 200 }));//this provides support for older browsers and specific preflight checks (like searches)
app.use(express.json());

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Plant Tracker API');
});

app.get('/health', (req, res) => {
    res.send({ status: 'ok' });
});

//read all plants
// GET /api/plants - Retrieve all plants with optional search and sort
// GET /api/plants?search=<term>&sort=<option>
app.get('/api/plants', async (req, res) => {
    try {
        const search = req.query.search || '';
        const sortOption = req.query.sort || '';

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { nickname: { $regex: search, $options: 'i' } },
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
//READ ONE: Get a single plant by its unique database ID
app.get('/api/plants/:id', async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) return res.status(404).json({ message: 'Plant not found' });
        res.json(plant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// CRUD
// POST /api/plants - Create a new plant
app.post('/api/plants', async (req, res) => {
    try {
        const plant = new Plant(req.body);
        await plant.save();
        res.status(201).json(plant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// UPDATE (Partial): Modify specific plant fields using PATCH
app.patch('/api/plants/:id', async (req, res) => {
    try {
        const updatedPlant = await Plant.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // $set tells MongoDB to only overwrite fields provided in req.body
            { new: true, runValidators: true }
        );
        if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
        res.json(updatedPlant);
    } catch (err) {
        // 🔍 FIX: Changed 'error' to 'message' to match your lab's handleResponse helper
        res.status(400).json({ message: err.message });
    }
});


// DELETE /api/plants/:id - Delete an existing plant
app.delete('/api/plants/:id', async (req, res) => {
    try {
        const plant = await Plant.findByIdAndDelete(req.params.id);
        if (!plant) {
            return res.status(404).json({ error: 'Plant not found' });
        }
        res.json({ message: 'Plant deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend router live at http://localhost:${PORT}`);
});
