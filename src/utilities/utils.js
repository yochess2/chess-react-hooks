export const dateHelper = {
	dateToMonthYear: (date) => {
		if (!date) return null
		return date.toLocaleString("default", { month: "short", year: "numeric" })
	},
	extractDate: (date) => {
		if (!date) return null
		return {
			month: parseInt(date.toLocaleString('default', { month: 'numeric' })),
			year: parseInt(date.toLocaleString('default', { year: 'numeric' })),
			monthYear: date
				.toLocaleString('default', { month: 'short', year: 'numeric' })
				.replace(' ', '-')
		}
	}, 
	fixChessDate: (ms) => {
		if (!ms) return  null
		return new Date(+(ms.toString() + "000"))
	},
}

export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function serialize (data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}