import React, { useState } from 'react'
import { NavLink, useLocation } from "react-router-dom"

import { FaCaretDown, FaCaretUp } from "react-icons/fa"


// import PropTypes from 'prop-types'

const SideBar = ({children, username}) => {
	const sidebarName = useSidebarName()
	const [toggle, setToggle] = useState(true)
	return (
		<>
			<div className="sidebar-heading text-center">
				<h1
					className="d-inline"
					data-bs-toggle="collapse" 
					data-bs-target="#side-menu"
					aria-expanded="true"
					aria-controls="collapseSidebar"
					role="button"
					onClick={() => {setToggle(!toggle)}}
				>
					{sidebarName}
					<Arrow toggle={toggle} />
				</h1>
			</div>
			<div className="sidebar-body show" id="side-menu">
				<div className="list-group">

					{children &&
					<li className="list-group-item p-0">
						{children}
					</li>
					}

					<NavLink className="list-group-item" to={getLink(username)}>
						<div className="ms-2 me-auto">
							<div className="fw-bold">Player</div>
							{username || "No Player"}
						</div>
					</NavLink>
					<NavLink className="list-group-item" to="games">
						<div className="ms-2 me-auto">
							<div className="fw-bold">Games</div>
							paragraphs
						</div>
					</NavLink>
					<NavLink className="list-group-item" to="board">
						<div className="ms-2 me-auto">
							<div className="fw-bold">Board</div>
							paragraphs
						</div>
					</NavLink>
					<NavLink className="list-group-item" to="twitch">
						<div className="ms-2 me-auto">
							<div className="fw-bold">Twitch</div>
							paragraphs
						</div>
					</NavLink>

				</div>
			</div>
		</>
	)
	function getLink(username) {
		if (username) {
			return `player/${username}`
		} else {
			return "player"
		}
	}

	function Arrow({toggle}) {
		return toggle ? <FaCaretUp /> : <FaCaretDown />
	}

	function useSidebarName() {
		const link = useLocation()

		let name 
		if (link.pathname.slice(1,6) === "games") {
			return "Games"
		}
		if (link.pathname.slice(1,7) === "player") {
			return "Player"
		}
		name = link.pathname.charAt(1).toUpperCase() + link.pathname.slice(2,link.pathname.length)
		return name || "Sidebar"
	}
}


// SideBar.propTypes = {

// }

export default React.memo(SideBar)