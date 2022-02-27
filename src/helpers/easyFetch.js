/**
 * Simple way to use Fetch
 *
 * @param {string} url
 * @param {string} method
 * @param {Object[]} data
 * @param {boolean} token
 * @returns {Object[]}
 */
export async function easyFetch(url, method, data, token) {
	let headers = {
		'Content-Type': 'application/json',
	};
	if (token) {
		const userToken = localStorage.getItem('user');
		headers.Authorization = userToken;
	}

	let parameters = {
		method: method, // *GET, POST, PUT, DELETE, etc.
		cache: 'no-cache',
		headers: headers,
	};
	if (data) {
		parameters.body = JSON.stringify(data);
	}

	const response = await fetch(url, parameters);
	return await response.json();
}
