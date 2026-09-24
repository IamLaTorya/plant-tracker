# 🌿 Home Plant Tracker

A mini-fullstack web application built to catalog, search, and sort houseplants. The application features a modular frontend utilizing **Vite + React** and a decoupled backend processing layer built with **Node.js, Express, and MongoDB**. 

It handles data manipulation states through both **Frontend-side mutations** and **Backend-side database query streams** to showcase a comprehensive understanding of modern fullstack data flow architectures.

## 📁 Project Architecture

```text
plant-tracker/
├── .gitignore             # Root level version exclusion matrix
├── README.md              # Project documentation
├── server/                # Backend layer (Express API + Mongoose)
│   ├── models/
│   │   └── Plant.js       # Mongoose Data Schema definition
│   ├── server.js          # Main Express API entry router
│   ├── seed.js            # Independent database backup seed file
│   └── package.json
└── client/                # Frontend layer (Vite + React)
    ├── src/
    │   ├── components/
    │   │   ├── PlantForm.jsx   # Input fields for record insertion
    │   │   ├── PlantList.jsx   # Grid summary layout map blocks
    │   │   └── SearchBar.jsx   # Query search, sort and processing filters
    │   ├── services/
    │   │   └── api.js          # Structural network transaction layer
    │   ├── App.jsx            # Parent shell layout and app hooks state engine
    │   └── main.jsx
    └── package.json
```

---

## 🛠️ Main Feature Matrix
* **Cross-Origin Resource Sharing (CORS):** Fully integrated via the `cors` dependency package on the Express web server, allowing secure network requests from the local client dev path (`http://localhost:5173`) to the backend API pipelines.
* **Dual-Mode Processing Toggle:** Allows toggling execution logic seamlessly in real-time between client-side array management and database query streams (`$or` regex matching).
* **Cross-Field Searching:** Real-time character evaluation across names, custom nicknames, scientific species strings, and physical room locations.
* **Multi-Field Sorting:** Custom filtering capabilities handling text (`Name A-Z`), sequence integers (`Watering Frequency`), and calendar timestamps (`Last Watered`, `Newest Added`).
* **Active Form Insertion:** Submits newly registered plants safely into the live database through server-validated REST API endpoints.

---

## 🚀 Step-by-Step Installation & Run Configurations

Make sure you have [Node.js](https://nodejs.org) and a running instance of **MongoDB** installed locally before processing the environment tasks below.

### 1. Root Configuration Environment Setup
Create a `.env` file inside your `/server` subdirectory and declare your system target connection environment paths:
```env
MONGO_URI=mongodb://127.0.0.1:27017/plant_tracker
NODE_ENV=development
```

### 2. Seeding your Database Records
Wipe out outdated records and load your clean backup baseline dataset into your MongoDB cluster:
```bash
cd server
npm install
node seed.js
```

### 3. Activating your Backend Web Server
Spin up your Express routing framework onto port `5000`:
```bash
node server.js
```

### 4. Compiling your Client Application Engine
Open a separate, concurrent terminal instance to launch your local Vite + React server:
```bash
cd ../client
npm install
npm run dev
```
Navigate to your local browser environment path (usually `http://localhost:5173`) to view and interact with the Plant Tracker platform!

---

## 📝 Plant Schema Specification Blueprint

Individual entries match the structure defined by your Mongoose schema parameters below:

| Property | Data Type | Purpose / Formatting Requirements |
| :--- | :--- | :--- |
| `name` | `String` | Common baseline variant identifier (e.g., "Jade Pothos") |
| `nickname` | `String` | Personalized identifier placeholder (e.g., "Divine") |
| `species` | `String` | Official scientific botanical nomenclature string |
| `location` | `String` | Physical placement area designation (e.g., "Front Window") |
| `watering_frequency` | `Number` | Expected care interval counter metric measured in total days |
| `last_watered` | `String` | Strict sorting date string formatted as `MM-DD-YYYY` |
| `date_added` | `String` | System injection date string formatted as `MM-DD-YYYY` |

---

## 👨‍💻 Author
* **LaTorya Hoyle-Sadler** - *Fullstack Application Architecture & Engineering*
