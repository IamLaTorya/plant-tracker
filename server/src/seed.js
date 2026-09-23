import 'dotenv/config';
import mongoose from 'mongoose';
import Plant from './models/Plant.js';
// Plant tracker
const startingPlants = [
    {//1
        name: "Jade Pothos",
        nickname: "Divine",
        species: "Epipremnum aureum",
        location: "Front Window",
        watering_frequency: 14,
        last_watered: "09-15-2026",
        date_added: "05-03-2020"
    },
    {//2
        name: "Spider Plant",
        nickname: "Samantha",
        species: "Chlorophytum comosum",
        location: "Kitchen",
        watering_frequency: 7,
        last_watered: "09-21-2026",
        date_added: "09-20-2026"
    },
    {//3
        name: "Wandering Jew",
        nickname: "Jewbie",
        species: "Tradescantia zebrina",
        location: "Living Room",
        watering_frequency: 7,
        last_watered: "09-18-2026",
        date_added: "07-12-2022"
    },
    {//4
        name: "Jacob Coat",
        nickname: "Blendy",
        species: "Acalypha hispida",
        location: "Outside",
        watering_frequency: 7,
        last_watered: "09-19-2026",
        date_added: "08-14-2024"
    },
    {
        name: "Money Tree",
        nickname: "Lucky",
        species: "Pachira aquatica",
        location: "Living Room",
        watering_frequency: 14,
        last_watered: "09-20-2026",
        date_added: "06-10-2021"
    },
    {//5
        name: "Autumn Sunflower",
        nickname: "Sunny",
        species: "Helianthus annuus",
        location: "Outside",
        watering_frequency: 7,
        last_watered: "09-22-2026",
        date_added: "07-15-2025"
    },
    {//6    
        name: "Stripes Fittonia",
        nickname: "Miss Nerve",
        species: "Fittonia albivenis",
        location: "Living Room",
        watering_frequency: 7,
        last_watered: "09-23-2026",
        date_added: "08-01-2023"
    },
    {//7
        name: "Calathea",
        nickname: "Calathea",
        species: "Calathea ornata",
        location: "Living Room",
        watering_frequency: 7,
        last_watered: "09-24-2026",
        date_added: "09-01-2023"
    },
    {//8
        name: "Rieger Begonia",
        nickname: "Bloom",
        species: "Begonia × hybrida",
        location: "Living Room",
        watering_frequency: 7,
        last_watered: "09-25-2026",
        date_added: "09-05-2023"
    },
    {//9
        name: "Washington Hawthorn Tree",
        nickname: "Hawthorn",
        species: "Crataegus phaenopyrum",
        location: "Outside",
        watering_frequency: 7,
        last_watered: "09-26-2026",
        date_added: "12-10-2025"
    },
    {//10
        name: "Air Plant",
        nickname: "Buddah",
        species: "Tillandsia",
        location: "Walkway Corner",
        watering_frequency: 7,
        last_watered: "09-20-2026",
        date_added: "04-12-2026"
    }
];

// search by Name, species, location
// Name A–Z, last watered, watering frequency, newest added


async function seed() {
    try {
        console.log('🔄 Connecting to MongoDB...')
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Safety net: never wipe a real database by accident.
        if (process.env.NODE_ENV === 'production') {
            console.error('Refusing to seed a production database.');
            process.exit(1);
        }

        const deleted = await Plant.deleteMany({});
        console.log(`🗑️  Cleared ${deleted.deletedCount} existing plants`);

        const created = await Plant.insertMany(startingPlants);
        console.log(`🌱 Successfully added ${created.length} plants into MongoDB`);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

seed();

