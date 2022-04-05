import axios from 'axios';

/**
 * Simple way to use Axios
 *
 * @param {string} url
 * @param {string} method
 * @param {Object[]} data
 * @param {boolean} token
 * @returns {Object[]}
 */
export async function easyAxios(url, method, data, token) {
	const options = {
		url: url,
		method: method,
	};

	if (data) {
		options.data = data;
	}

	if (token) {
		const userToken = localStorage.getItem('token');
		axios.defaults.headers.common = { Authorization: userToken };
	}

	return axios(options);
}
