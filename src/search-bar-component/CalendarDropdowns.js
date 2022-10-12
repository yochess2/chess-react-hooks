import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import CalendarDropdown from "./CalendarDropdown"
import { ErrorContext } from "../ErrorComponent.js"

const CalendarDropdowns = ({startDate, endDate, setStartDate, setEndDate}) => {
	const [open, setOpen] = useState(false)
	const errorContext = useContext(ErrorContext)

	return (
		<div className="input-group">
			<CalendarDropdown date={startDate} onChange={handleStartDate} open={false}/>
			<CalendarDropdown date={endDate} onChange={handleEndDate} open={open}/>
		</div>
	)

	function handleStartDate(date, event) {
		if (date > new Date()) {
			errorContext.setError({
				value: true,
				type: "searchbar",
				message: "Start date cannot be set to the future!"
			})
			return false
		}
		setStartDate(date)
		setOpen(true)
		return true
	}

	function handleEndDate(date, event) {
		if (date < startDate) {
			errorContext.setError({
				value: true,
				type: "searchbar",
				message: "End date cannot be before start date!"
			})
			return false
		}
		setEndDate(date)
		setOpen(false)
		return true
	}
}



CalendarDropdowns.propTypes = {
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	setStartDate: PropTypes.func,
	setEndDate: PropTypes.func,
}

export default CalendarDropdowns