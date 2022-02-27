/**
 * Get the Date in the correct format.
 *
 * @param {string} stockDate
 * @returns {string} m.d.yyyy
 */
export function dateGenerator(stockDate) {
	return stockDate.replace(/\//g, '.');
}
