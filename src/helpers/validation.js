/**
 * Validation
 *
 * @param {bool} rule
 * @param {string} message
 * @returns {bool}
 */
export function validation(rule, message) {
	if (rule) {
		return true;
	}
	alert(message);
	return false;
}
