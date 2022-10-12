import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { dateHelper } from "../utilities/utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

const styles = {
	dropdownButtonWrapper: {
		width: "50%",
	},
	dropdownButton: { 
		width: "100%",
	}
}

const CalendarDropdown = ({date, onChange, open }) => {
	const elemRef = useRef(null)
	const monthYear = dateHelper.dateToMonthYear(date, open)

	useEffect(() => {
		let thisEl = elemRef.current
		if (open) {
			thisEl?.click()
		} 
		return () => {
			if (isOpen()) { 
				thisEl?.click()
			}
		}
		function isOpen() {
			return elemRef.current?.ariaExpanded === "true"
		}
	}, [open])

	return (
		<div className="dropdown" style={styles.dropdownButtonWrapper}>
			<button
				ref={elemRef}
				style={styles.dropdownButton}
				className="btn btn-secondary dropdown-toggle dropdown-button-custom" 
				type="button btn-outline"
				data-bs-toggle="dropdown"
				data-bs-auto-close="outside" // this closes the dropdown when the user clicks outside the dropdown menu
				aria-expanded="false">
				<span>{monthYear}</span>
			</button>
			<ul className="dropdown-menu" onClick={e => e.stopPropagation()}>
				<Calendar 
					maxDetail="year"
					value={date}
					onClickMonth={(date, event) => onClickMonth(date, event) } />
			</ul>

		</div>
	)
	function onClickMonth(date, event) {
		const isSet = onChange(date, event)
		if (isSet) {
			elemRef.current.click()
		}
	}
}


CalendarDropdown.propTypes = {
	date: PropTypes.instanceOf(Date),
	onChange: PropTypes.func,
	open: PropTypes.bool,
}

export default CalendarDropdown