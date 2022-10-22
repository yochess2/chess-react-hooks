import React from 'react';
import { NavLink } from "react-router-dom"

const NavBar = ({children, username}) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
		  	<div className="container-fluid">
		    	<NavLink className="navbar-brand" to="/">YoChess</NavLink>
		    	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="toggle navigation">
		      		<span className="navbar-toggler-icon"></span>
		    	</button>
			    <div className="collapse navbar-collapse" id="navbarSupportedContent">
			      	<ul className="navbar-nav me-auto mb-2 mb-lg-0">

			        	{username &&
			        	<li className="nav-item">
			          		<NavLink className="nav-link" to={getLink(username)}>{username}</NavLink>
			        	</li>
			        	}

			        	<li className="nav-item">
			          		<NavLink className="nav-link" to="games">Games</NavLink>
			        	</li>
			        	<li className="nav-item">
			          		<NavLink className="nav-link" to="board">Board</NavLink>
			        	</li>
			        	<li className="nav-item">
			          		<NavLink className="nav-link" to="twitch">Twitch</NavLink>
			        	</li>
			      	</ul>
			      	{children}
		    	</div>
		  	</div>
		</nav>
	)

	function getLink(username) {
		if (username) {
			return `player/${username}`
		} else {
			return "player"
		}
	}
};

export default React.memo(NavBar);