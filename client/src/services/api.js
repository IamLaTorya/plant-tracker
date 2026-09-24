const BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Every response goes through here.
 * Checks res.ok explicitly since fetch() does not throw errors on 404 or 500 codes.
 */
async function handleResponse(res) {
    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data.message) message = data.message;
            else if (data.error) message = data.error;
        } catch {
            // Response was not JSON. Keep the generic message.
        }
        throw new Error(message);
    }

    // 204 No Content (like a successful DELETE) has an empty body.
    if (res.status === 204) return null;

    return res.json();
}

// ---------------------------------------------------------------
// GET all plants (Optionally filtered by search text & arranged by sort selection)
// ---------------------------------------------------------------
export async function fetchPlants(search = '', sort = '') {
    // Use URLSearchParams to handle query formatting safely
    const queryParams = new URLSearchParams();

    // Use encodeURIComponent to securely safely escape spaces/characters inside input text
    if (search) queryParams.append('search', search);
    if (sort) queryParams.append('sort', sort);

    const queryString = queryParams.toString();
    const url = queryString
        ? `${BASE_URL}/api/plants?${queryString}`
        : `${BASE_URL}/api/plants`;

    const res = await fetch(url);
    return handleResponse(res);
}

// ---------------------------------------------------------------
// POST a new plant record to the collection
// ---------------------------------------------------------------
export async function createPlant(plant) {
    const res = await fetch(`${BASE_URL}/api/plants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plant),
    });
    return handleResponse(res);
}

// ---------------------------------------------------------------
// PATCH an existing plant — send ONLY what changed
// ---------------------------------------------------------------
export async function updatePlant(id, changes) {
    const res = await fetch(`${BASE_URL}/api/plants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
    });
    return handleResponse(res);
}

// ---------------------------------------------------------------
// DELETE a plant by its unique database identifier
// ---------------------------------------------------------------
export async function deletePlant(id) {
    const res = await fetch(`${BASE_URL}/api/plants/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(res);
}
