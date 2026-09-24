import { useState } from 'react';
import { createPlant } from '../services/api';

export default function PlantForm({ onPlantAdded }) {
    const [formData, setFormData] = useState({
        name: '', 
        nickname: '', 
        species: '', 
        location: '', 
        watering_frequency: 7, 
        last_watered: '',
        date_added: '' // Holds the optional user input string
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.species || !formData.location || !formData.last_watered) {
            alert('Please fill out all required fields.');
            return;
        }

        // Determine the date_added value: Use what the user picked, 
        // or default to today's date in YYYY-MM-DD format if they left it blank.
        const structuralDateAdded = formData.date_added.trim() !== '' 
            ? formData.date_added 
            : new Date().toISOString().split('T')[0];

        const newPlant = {
            ...formData,
            watering_frequency: Number(formData.watering_frequency),
            date_added: structuralDateAdded
        };

        try {
            const savedPlant = await createPlant(newPlant);

            // Successfully committed to MongoDB, trigger callback update
            onPlantAdded(savedPlant);
            
            // Clear out form inputs completely
            setFormData({ 
                name: '', 
                nickname: '', 
                species: '', 
                location: '', 
                watering_frequency: 7, 
                last_watered: '', 
                date_added: '' 
            });
            alert('Plant successfully added to your greenhouse!');
        } catch (err) {
            console.error('Network form transaction error:', err);
            alert(`Failed to add plant: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3 className="form-title">🌿 Add a New Plant</h3>
            <div className="form-grid">
                <input type="text" placeholder="Common Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input type="text" placeholder="Nickname (Optional)" value={formData.nickname} onChange={e => setFormData({ ...formData, nickname: e.target.value })} />
                <input type="text" placeholder="Species (Scientific) *" value={formData.species} onChange={e => setFormData({ ...formData, species: e.target.value })} />
                <input type="text" placeholder="Location *" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />

                <label className="form-label">
                    Water Frequency (Days) *
                    <input type="number" min="1" value={formData.watering_frequency} onChange={e => setFormData({ ...formData, watering_frequency: e.target.value })} />
                </label>

                <label className="form-label">
                    Last Watered Date *
                    <input type="date" value={formData.last_watered} onChange={e => setFormData({ ...formData, last_watered: e.target.value })} />
                </label>

                {/* 📅 Optional User-Input Date Added Field */}
                <label className="form-label">
                    Date Added (Optional)
                    <input type="date" value={formData.date_added} onChange={e => setFormData({ ...formData, date_added: e.target.value })} />
                </label>
            </div>
            <button type="submit" className="submit-btn">Add Plant Record</button>
        </form>
    );
}
