export default function SearchBar({ search, setSearch, sort, setSort }) {
    return (
        <div className="controls-container">
            <input
                type="text"
                placeholder="Search by name, species, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
                <option value="name_asc">Name (A–Z)</option>
                <option value="last_watered_asc">Last Watered (Oldest First)</option>
                <option value="frequency_asc">Watering Frequency (Shortest First)</option>
                <option value="date_added_desc">Newest Added</option>
            </select>
        </div>
    );
}
