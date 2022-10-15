import React, { useContext } from 'react'
// import { useParams } from "react-router-dom"
import ChessWebApi from "chess-web-api"
import PulseLoader from "react-spinners/PulseLoader"

import { usePlayerInfo, usePlayerStats } from "./usePlayer"
import { SetErrorContext } from "../ErrorComponent.js"

import { dateHelper, isJsonString } from "../utilities/utils"

const PlayerProfile = ({username, startDate, endDate, setPlayer}) => {
	// const params = useParams()

	const setErrorContext = useContext(SetErrorContext)
	const api = new ChessWebApi()

	const { data, isFetching } = usePlayerInfo(username, api, handlePlayerError, handleSuccess)
	const playerInfo = data?.body

	const { data: data2 } = usePlayerStats(username, playerInfo, api)
	const playerStats = data2?.body

	if (isFetching) {
		return <><h4>Fetching...</h4><PulseLoader /></>
	}

	return (
		<>{playerInfo && 
		<div className="card text-center mt-sm-2" style={{maxWidth: "574px"}}>
			<div className="d-none d-lg-block">
	    		<PlayerUsername playerInfo={playerInfo} />
			</div>
			<div className="row">
				{ playerInfo.avatar && <PlayerImage playerInfo={playerInfo} /> }
				<div className="col-12 col-sm-6 col-lg-12">
					<div className="card-body">
						<div className="d-lg-none ms-2">
			    			<PlayerUsername playerInfo={playerInfo} />
			    		</div>
						<ul className="list-group">
							{ playerInfo && <PlayerName playerInfo={playerInfo} /> }
							<PlayerDates playerInfo={playerInfo} />
			    		    { playerStats && <PlayerStats playerStats={playerStats} /> }
		    		    </ul>
				  	</div>
				</div>
			</div>
		</div>
		}</>
	)
	function handlePlayerError(error) {
		setErrorContext({
			value: true,
			type: "player",
			message: error.message && isJsonString(error.message) && JSON.parse(error.message).message
		})
	}

	function handleSuccess(response) {
		console.log('>>>> invoked')
		const { fixChessDate, extractDate } = dateHelper
		setPlayer(prevState => ({
			username: response.body.username,
			startDate: getStarttDate(startDate, response.body.joined),
			endDate: getEndDate(endDate),
		}))

		function getStarttDate(startDate, joinedDate) {
			if (!joinedDate) return extractDate(startDate).monthYear 

			if (startDate < fixChessDate(joinedDate)) {
				return extractDate(fixChessDate(joinedDate)).monthYear
			} else {
				return extractDate(startDate).monthYear
			}
		}

		function getEndDate() {
			const today = new Date()
			if (endDate > today) {
				return extractDate(today).monthYear
			} else {
				return extractDate(endDate).monthYear
			}
		}
	}
}

function PlayerUsername({playerInfo}) {
	return <h2>{playerInfo.title && <b>{playerInfo.title}</b>}{" "}{playerInfo.username}</h2>
}

function PlayerImage({playerInfo}) {
	return (
		<div className="col-12 col-sm-6 col-lg-12 d-none d-sm-block">
			<div className="card-header">
				<img src={playerInfo.avatar} className="card-img-top" alt="Logo" />
			</div>
		</div>
	)
}

function PlayerName({playerInfo}) {
	return (
		<li className="list-group-item">
		    <p style={{margin: "0"}}>
		    	<b>{playerInfo.name}</b> 
		    </p>
		</li>
	)
}

function PlayerDates({playerInfo}) {
	const { fixChessDate, extractDate } = dateHelper
	return (
		<li className="list-group-item">
		    <p style={{margin: "0"}}><b>join date:</b> {extractDate(fixChessDate(playerInfo.joined)).monthYear}</p>
	    	<p style={{margin: "0"}}><b>last seen:</b> {extractDate(fixChessDate(playerInfo.last_online)).monthYear}</p>
		</li>
	)
}

function PlayerStats({playerStats}) {
	return (
		<li className="list-group-item">
			{!!playerStats.fide && <p style={{margin: "0"}}><b>Fide:{" "}</b>{playerStats.fide}</p>}
			{playerStats.chess_rapid && <p style={{margin: "0"}}><b>Rapid:</b> {playerStats.chess_rapid.last.rating}</p>}
			{playerStats.chess_blitz && <p style={{margin: "0"}}><b>Blitz:</b> {playerStats.chess_blitz.last.rating}</p>}
			{playerStats.chess_bullet && <p style={{margin: "0"}}><b>Bullet:</b> {playerStats.chess_bullet.last.rating}</p>}
		</li>
	)
}

export default React.memo(PlayerProfile)

// export async function loader({params}) {
// 	const api = new ChessWebApi()
// 	if (!params && !params.username) {
// 		return 
// 	}
// 	const response = await api.getPlayer(params.username)
// 	const response2 = await api.getPlayerStats(params.username)
// 	return { playerInfo: response.body, playerStats: response2.body }
// }