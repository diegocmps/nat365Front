/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api(endpoint, init) {
    const url = 'http://localhost:3000' + endpoint
    return fetch(url, init)
}