import React from 'react'

const PlayerSide = ({player}) => {
	return (
		<>{player?.username && 

		
		<div className="card text-center mt-sm-2" style={{maxWidth: "574px"}}>
	    	<PlayerUsername player={player} />
			<div className="row">
				{ player.avatar && <PlayerImage player={player} /> }
				<div className="col-12 col-sm-6 col-lg-12">
					<div className="card-body">
						<div className="d-lg-none ms-2">
			    			<PlayerUsername player={player} />
			    		</div>
						<ul className="list-group">
							{ player.name && <PlayerName player={player} /> }
							<PlayerDates player={player} />
		    		    </ul>
				  	</div>
				</div>
			</div>
		</div>
		}</>
	)
}

function PlayerUsername({player}) {
	return <h2>{player.title && <b>{player.title}</b>}{" "}{player.username}</h2>
}

function PlayerImage({player}) {
	return (
		<div className="col-12 col-sm-6 col-lg-12 d-none d-sm-block">
			<div className="card-header">
				<img src={player.avatar} className="card-img-top" alt="Logo" />
			</div>
		</div>
	)
}

function PlayerName({player}) {
	return (
		<li className="list-group-item">
		    <p style={{margin: "0"}}>
		    	<b>{player.name}</b> 
		    </p>
		</li>
	)
}

function PlayerDates({player}) {
	return (
		<li className="list-group-item">
		    <p style={{margin: "0"}}><b>join date:</b> {player.startDate}</p>
	    	<p style={{margin: "0"}}><b>last seen:</b> {player.lastOnline}</p>
		</li>
	)
}

export default React.memo(PlayerSide)