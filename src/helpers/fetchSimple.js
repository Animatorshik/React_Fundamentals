/**
 * Simple way to use Fetch
 *
 * @param {string} url
 * @param {string} method
 * @param {Object[]} data
 * @returns {Object[]}
 */
export async function fetchSimple(url, method, data) {
	const response = await fetch(url, {
		method: method, // *GET, POST, PUT, DELETE, etc.
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return await response.json();
}
