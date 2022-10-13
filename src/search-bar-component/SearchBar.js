import React, { useState, useContext } from 'react'

import CalendarDropdowns from "./CalendarDropdowns"
import { SetErrorContext } from "../ErrorComponent.js"

import PropTypes from 'prop-types'

const SearchBar = ({ setInputs }) => {
	const setErrorContext = useContext(SetErrorContext)

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
						onKeyPress={e => { if (e.key === "Enter") handleSubmit() }} 
						aria-label="Search Username"/>
					<button
						id="usersearch01" 
						className="btn btn-primary btn-outline" 
						onClick={handleSubmit}>
						Search
					</button>
				</div>
			</div>	
		</div>
	)

	function handleSubmit() {
		if (username.length === 0) {
			setErrorContext({
				value: true,
				type: "searchbar",
				message: "Input should not be blank",
			})
			return false
		}
		if (!endDate || !startDate || (endDate < startDate)) {
			setErrorContext({
				value: true,
				type: "searchbar",
				message: "Dates are invalid",
			})
			return false
		}
		setErrorContext({ value: false, type: "searchbar", message: "" })
		setInputs({username, startDate, endDate})
		setUsername("")
		return true
	}
}

SearchBar.propTypes = {
	setInputs: PropTypes.func,
} 

export default SearchBar