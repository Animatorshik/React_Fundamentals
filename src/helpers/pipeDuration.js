/**
 * Get the Duration in the correct format.
 *
 * @param {number} stockMinutes
 * @returns {string} hh:mm hours
 */
export function pipeDuration(stockMinutes) {
	let hours = Math.floor(stockMinutes / 60);
	let minutes = stockMinutes % 60;

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${hours}:${minutes} hours`;
}
