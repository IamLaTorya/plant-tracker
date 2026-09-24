import { useState } from 'react';

export default function PlantList({ displayList, onDeleteClick, onUpdatePlant }) {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    if (displayList.length === 0) {
        return (
            <p className="empty-message">
                No matching plants found in your greenhouse.
            </p>
        );
    }

    const handleEditClick = (plant) => {
        setEditingId(plant._id || plant.id);
        setEditFormData({ ...plant });
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleSaveClick = async (id) => {
        // Create a copy of the state and remove MongoDB's internal system fields
        const cleanedData = { ...editFormData };
        delete cleanedData._id;
        delete cleanedData.__v;

        const success = await onUpdatePlant(id, cleanedData);
        if (success) {
            handleCancelClick();
        }
    };


    return (
        <div className="plant-grid">
            {displayList.map(plant => {
                const isEditing = editingId === (plant._id || plant.id);

                return (
                    <div key={plant._id || plant.id} className="plant-card">
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={() => onDeleteClick(plant._id || plant.id)}
                                    className="delete-btn"
                                    title="Remove plant record"
                                >
                                    ❌
                                </button>

                                <h3 className="card-title">
                                    {plant.nickname ? `${plant.nickname} (${plant.name})` : plant.name}
                                </h3>
                                <span className="species-tag">{plant.species}</span>
                                <div className="meta-row">📍 <strong>Location:</strong> {plant.location}</div>
                                <div className="meta-row">💧 <strong>Watering:</strong> Every {plant.watering_frequency} days</div>
                                <div className="meta-row">📅 <strong>Last Watered:</strong> {plant.last_watered}</div>
                                <div className="date-footer">Added: {plant.date_added}</div>

                                <button
                                    onClick={() => handleEditClick(plant)}
                                    className="submit-btn edit-btn"
                                >
                                    ✏️ Edit Plant
                                </button>
                            </>
                        ) : (
                            <div className="edit-mode-container">
                                <h4 className="edit-mode-title">Editing Plant Details</h4>

                                <label className="form-label">
                                    Common Name
                                    <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} />
                                </label>

                                <label className="form-label">
                                    Nickname
                                    <input type="text" value={editFormData.nickname || ''} onChange={e => setEditFormData({ ...editFormData, nickname: e.target.value })} />
                                </label>

                                <label className="form-label">
                                    Species
                                    <input type="text" value={editFormData.species || ''} onChange={e => setEditFormData({ ...editFormData, species: e.target.value })} />
                                </label>

                                <label className="form-label">
                                    Location
                                    <input type="text" value={editFormData.location || ''} onChange={e => setEditFormData({ ...editFormData, location: e.target.value })} />
                                </label>

                                <label className="form-label">
                                    Watering Frequency (Days)
                                    <input type="number" min="1" value={editFormData.watering_frequency || 7} onChange={e => setEditFormData({ ...editFormData, watering_frequency: Number(e.target.value) })} />
                                </label>

                                <label className="form-label">
                                    Last Watered
                                    <input type="date" value={editFormData.last_watered || ''} onChange={e => setEditFormData({ ...editFormData, last_watered: e.target.value })} />
                                </label>

                                {/* 📅 Fully Editable Date Added Field */}
                                <label className="form-label">
                                    Date Added
                                    <input type="date" value={editFormData.date_added || ''} onChange={e => setEditFormData({ ...editFormData, date_added: e.target.value })} />
                                </label>

                                <div className="card-actions-wrapper">
                                    <button
                                        onClick={() => handleSaveClick(plant._id || plant.id)}
                                        className="submit-btn save-btn"
                                    >
                                        💾 Save
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="submit-btn cancel-btn"
                                    >
                                        🚫 Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
