export const dateHelper = {
	dateToMonthYear: (date) => {
		return date.toLocaleString("default", { month: "short", year: "numeric" })
	},
}