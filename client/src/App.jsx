import { useState, useEffect } from 'react';
import { fetchPlants, deletePlant, updatePlant } from './services/api';
import PlantForm from './components/PlantForm';
import SearchBar from './components/SearchBar';
import PlantList from './components/PlantList';
import './App.css';

export default function App() {
  const [displayList, setDisplayList] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name_asc');

  // Unified data pipeline fetching filtered/sorted results from MongoDB
  const loadBackendData = () => {
    fetchPlants(search, sort)
      .then(data => {
        // Sets the live MongoDB documents array directly to your UI display state
        setDisplayList(data); 
      })
      .catch(err => console.error("Database query processing failure:", err));
  };

  // 🔍 FIX 1: Run on initial application mount to load your original 11 seeded plants immediately!
  useEffect(() => {
    loadBackendData();
  }, [search, sort]);

  // Callback to refresh data display whenever a new record is posted
  const handlePlantAdded = () => {
    loadBackendData();
  };

  // 🔍 FIX 2: Handles updating a plant inline, feeding the patch through to MongoDB
  const handlePlantUpdate = async (id, updatedFields) => {
    try {
      await updatePlant(id, updatedFields);
      loadBackendData(); // Refetch database changes to sync view parameters across the stack
      return true;
    } catch (err) {
      console.error("Could not process record update:", err);
      alert(`Update failed: ${err.message}`);
      return false;
    }
  };

  const handlePlantDelete = async (id) => {
    if (window.confirm("Are you sure this plant was sold or removed?")) {
      try {
        await deletePlant(id);
        loadBackendData(); // Instantly sync UI grid view with database updates
      } catch (err) {
        console.error("Could not complete delete operation:", err);
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🌿 Home Plant Tracking Station</h1>
      
      <PlantForm onPlantAdded={handlePlantAdded} />
      
      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        sort={sort} 
        setSort={setSort} 
      />

      <div className="results-counter">
        Showing {displayList.length} plant records
      </div>

      <PlantList 
        displayList={displayList} 
        onDeleteClick={handlePlantDelete} 
        onUpdatePlant={handlePlantUpdate} // Passes operational update pipeline down
      />
    </div>
  );
}
