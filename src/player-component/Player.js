import React, { useContext, useCallback } from 'react'
import { useParams, useOutletContext } from "react-router-dom"

import { usePlayerInfo, usePlayerStats } from "./usePlayer"
import { SetErrorContext } from "../ErrorComponent.js"

import { dateHelper, isJsonString } from "../utilities/utils"


const Player = () => {
	const [setPlayer, api] = useOutletContext()
	const params = useParams()
	const username = params.username
	const setErrorContext = useContext(SetErrorContext)

	const handlePlayerError = useCallback((error) => {
		setErrorContext({
			value: true,
			type: "player",
			message: error.message && isJsonString(error.message) && JSON.parse(error.message).message
		})
	}, [setErrorContext])

	const handleSuccess = useCallback((response) => {
		console.log('>>', response)
		const { fixChessDate, extractDate } = dateHelper
		setPlayer(prevPlayer =>({
			username: response.body.username,
			name: response.body.name,
			avatar: response.body.avatar,
			joined: response.body.joined,
			startDate: extractDate(fixChessDate(response.body.joined)).monthYear,
			last: response.body.last_online,
			lastOnline: extractDate(fixChessDate(response.body.last_online)).monthYear,
			title: response.body.title,
		}))
	}, [setPlayer])

	const handleSuccess2 = useCallback((response) => {
		console.log('>>', response)
		setPlayer(prevPlayer => ({
			...prevPlayer,
			fide: response.body.fide,
			blitz: response.body.chess_blitz,
			bullet: response.body.chess_bullet,
			daily: response.body.chess_daily,
			rapid: response.body.chess_rapid,
			lessons: response.body.lessons,
			puzzle_rush: response.body.puzzle_rush,
			tactics: response.body.tactics,
		}))
	}, [setPlayer])

	const { data } = usePlayerInfo(username, api, handlePlayerError, handleSuccess)
	const playerInfo = data?.body
	const { data: data2 } = usePlayerStats(username, playerInfo, api, handleSuccess2)
	const playerStats = data2?.body

	return (<>
		{playerInfo && <>
		<div className="card text-center mx-auto mt-sm-2" style={{maxWidth: "100%"}}>
			<div className="card-header">
				<PlayerUsername playerInfo={playerInfo} />
			</div>
			<div className="row card-body">
				<div className="col-6">
					<PlayerImage playerInfo={playerInfo} />
				</div>
				<div className="col-6">
					<ul className="list-group">
						{ playerInfo && <PlayerName playerInfo={playerInfo} /> }
						<PlayerDates playerInfo={playerInfo} />
		    		    { playerStats && <PlayerStats playerStats={playerStats} /> }
	    		    </ul>
				</div>
			</div>
		</div>
		<div className="recent-games text-center mt-2">
			<h2>Recent Games</h2>
		</div>

	</>}
</>)

		// function getStarttDate(startDate, joinedDate) {
		// 	if (!joinedDate) return extractDate(startDate).monthYear 

		// 	if (startDate < fixChessDate(joinedDate)) {
		// 		return extractDate(fixChessDate(joinedDate)).monthYear
		// 	} else {
		// 		return extractDate(startDate).monthYear
		// 	}
		// }

		// function getEndDate() {
		// 	const today = new Date()
		// 	if (endDate > today) {
		// 		return extractDate(today).monthYear
		// 	} else {
		// 		return extractDate(endDate).monthYear
		// 	}
		// }
}

function PlayerUsername({playerInfo}) {
	return <h2>{playerInfo.title && <b>{playerInfo.title}</b>}{" "}{playerInfo.username}</h2>
}

function PlayerImage({playerInfo}) {
	return (
		<img src={playerInfo.avatar} className="card-img-top" alt="Logo" style={{width: "auto"}}/>
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

export default React.memo(Player)

// export async function loader({params}) {
// 	const api = new ChessWebApi()
// 	if (!params && !params.username) {
// 		return 
// 	}
// 	const response = await api.getPlayer(params.username)
// 	const response2 = await api.getPlayerStats(params.username)
// 	return { playerInfo: response.body, playerStats: response2.body }
// }