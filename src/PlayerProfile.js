import React, { useContext, useEffect } from 'react'
import ChessWebApi from "chess-web-api"
import { useQuery } from "@tanstack/react-query"

import { SetErrorContext } from "./ErrorComponent.js"

const PlayerProfile = ({username, startDate, endDate}) => {
	const setErrorContext = useContext(SetErrorContext)
	const api = new ChessWebApi()

	const { data } = useQuery([
		"username", username
	], () => {
		console.log('fetching')
		return api.getPlayer(username)
	},{
		onError: handleError,
		enabled: !!username,
	})
	const playerInfo = data?.body
	const { data: data2 } = useQuery([
		`username_2`, playerInfo
	], () => {
		console.log('fetching again')
		return api.getPlayerStats(username)
	}, {
		onError: handleError,
		enabled: !!playerInfo,
		onSuccess: () => {
			console.log('done')
		}
	})
	const playerStats = data2?.body


	useEffect(() => {
		console.count('fetching')
	})
	return (<>
		{playerInfo && 
		<div className="card mt-sm-2" style={{maxWidth: "574px"}}>
			<div className="row d-none d-lg-block ms-2">
				<div className="col">
		    		<h2>{playerInfo.title && <b>{playerInfo.title} </b> }{playerInfo.username}</h2>
				</div>
			</div>

			<div className="row">
				{playerInfo.avatar &&
				<div className="col-12 col-sm-6 col-lg-12 d-none d-sm-block">
					<div className="card-header">
						<img src={playerInfo.avatar} className="card-img-top" alt="Logo" />
					</div>

				</div>
				}
				<div className="col-12 col-sm-6 col-lg-12">
					<div className="card-body">
						<div className="d-lg-none ms-2">
			    			<h2>{playerInfo.title && <b>{playerInfo.title} </b> }{playerInfo.username}</h2>
			    		</div>

						<ul className="list-group">

							{(playerInfo.name || playerInfo.fide) &&
					    		<li className="list-group-item">
					    		    <p style={{margin: "0"}}>
					    		    	
					    		    	<b>{playerInfo.name}</b>
					    		    </p>
					    		    {!!playerInfo.fide &&
					    		    <p style={{margin: "0"}}><b>Fide:</b> {playerInfo.fide}</p>
					    		    }
					    		</li>
							}
				    		    
				    		{playerInfo.joined &&
				    		<li className="list-group-item">
				    		    <p style={{margin: "0"}}><b>join date:</b> {extractDate(fixChessDate(playerInfo.joined)).monthYear}</p>
			    		    	<p style={{margin: "0"}}><b>last seen:</b> {extractDate(fixChessDate(playerInfo.last_online)).monthYear}</p>
				    		</li>
			    			}

			    		    {playerStats &&	
			    		    <li className="list-group-item">
			    		    	{playerStats.chess_rapid &&
			    		    		<p style={{margin: "0"}}><b>Rapid:</b> {playerStats.chess_rapid.last.rating}</p>
			    		    	}
			    		    	{playerStats.chess_blitz &&
			    		    		<p style={{margin: "0"}}><b>Blitz:</b> {playerStats.chess_blitz.last.rating}</p>
			    		    	}
			    		    	{playerStats.chess_bullet &&
			    		    		<p style={{margin: "0"}}><b>Bullet:</b> {playerStats.chess_bullet.last.rating}</p>
			    		    	}
			    		    </li>
			    		    }
		    		    </ul>
				  	</div>
				</div>
			</div>
		</div>

		}
			
</>)
	function handleError(error) {
		setErrorContext({
			value: true,
			type: "player",
			message: error.message
		})
	}

	function extractDate(date) {
		return {
			month: parseInt(date.toLocaleString('default', { month: 'numeric' })),
			year: parseInt(date.toLocaleString('default', { year: 'numeric' })),
			monthYear: date
				.toLocaleString('default', { month: 'short', year: 'numeric' })
				.replace(' ', '-')
		}
	}

	function fixChessDate(ms) {
		return new Date(+(ms.toString() + "000"))
	}
}


export default React.memo(PlayerProfile)