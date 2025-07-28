export function clearSearch(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            clearSearch(value); // Corrected recursive call
        } else {
            if (typeof value === 'undefined' || (typeof value === 'string' && value.length < 1)) {
                delete obj[key];
            }
        }
    }
}