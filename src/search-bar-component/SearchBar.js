import React, { useState, useContext } from 'react'

import CalendarDropdowns from "./CalendarDropdowns"
import { ErrorContext } from "../ErrorComponent.js"

import PropTypes from 'prop-types'

const SearchBar = ({ handleSubmit }) => {
	const errorContext = useContext(ErrorContext)

	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [username, setUsername] = useState("")

	return (
		<div className="row mt-sm-2">
			<div className="col-12 col-md-6">
				<CalendarDropdowns
					startDate={startDate} 
					setStartDate={setStartDate} 
					endDate={endDate}
					setEndDate={setEndDate}/>
			</div>
			<div className="col-12 col-md-6">
				<div className="input-group search-inputs">
					<input 
						type="search"
						placeholder="Search Username"
						className="form-control"
						value={username}
						onChange={e => setUsername(e.target.value)}
						onKeyPress={e => { if (e.key === "Enter") onSubmit() }} 
						aria-label="Search Username"/>
					<button
						id="usersearch01" 
						className="btn btn-primary btn-outline" 
						onClick={onSubmit}>
						Search
					</button>
				</div>
			</div>	
		</div>
	)

	function onSubmit() {
		if (username.length === 0) {
			errorContext.setError({
				value: true,
				type: "searchbar",
				message: "Input should not be blank",
			})
			return false
		}
		if (!endDate || !startDate || (endDate < startDate)) {
			errorContext.setError({
				value: true,
				type: "searchbar",
				message: "Dates are invalid",
			})
			return false
		}
		errorContext.setError({ value: false, type: "searchbar", message: "" })
		handleSubmit(username, startDate, endDate)
		setUsername("")
		return true
	}
}

SearchBar.propTypes = {
	handleSubmit: PropTypes.func,
} 

export default React.memo(SearchBar)