/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */
export function api(endpoint, init) {
    const url = 'http://localhost:3000' + endpoint;
    return fetch(url, init);
}


/**
 * Fetches the localidade data from the JSON file.
 * @returns {Promise<any>}
 */
export async function fetchLocalidades() {
    const response = await fetch('http://localhost:3000/localidade');
    if (!response.ok) {
        throw new Error('Failed to fetch localidades');
    }
    return response.json();
}
