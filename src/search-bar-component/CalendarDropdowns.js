import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import CalendarDropdown from "./CalendarDropdown"
import { SetErrorContext } from "../ErrorComponent.js"

const CalendarDropdowns = ({startDate, endDate, setStartDate, setEndDate}) => {
	const [open, setOpen] = useState({
		open: false
	})
	const setErrorContext = useContext(SetErrorContext)

	return (
		<div className="input-group">
			<CalendarDropdown date={startDate} onChange={handleStartDate} />
			<CalendarDropdown date={endDate} onChange={handleEndDate} toggle={open} />
		</div>
	)
 
	function handleStartDate(date, event) {
		if (date > new Date()) {
			setErrorContext({
				value: true,
				type: "searchbar",
				message: "Start date cannot be set to the future!"
			})
			return false
		}
		setErrorContext({value: false, type: "", message: ""})
		setStartDate(date)
		setOpen({open: true})
		return true
	}

	function handleEndDate(date, event) {
		if (date < startDate) {
			setErrorContext({
				value: true,
				type: "searchbar",
				message: "End date cannot be before start date!"
			})
			return false
		}
		setErrorContext({value: false, type: "", message: ""})
		setEndDate(date)
		setOpen({open: false})
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