/**
 * Get the Date in the correct format.
 *
 * @param {string} stockDate
 * @returns {string} m.d.yyyy
 */
export function dateGenerator(stockDate) {
	let date = new Date(stockDate);
	return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
}
