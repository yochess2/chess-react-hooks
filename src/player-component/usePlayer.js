import { useQuery } from "@tanstack/react-query"

export function usePlayerInfo(username, api, handleError, handleSuccess) {
	return useQuery(
	['username', username], 
	() => api.getPlayer(username), 
	{ 
		onError: handleError, 
		onSuccess: handleSuccess,
		enabled: !!username, 
		retry: false,
	})
}

export function usePlayerStats(username, playerInfo, api, handleSuccess) {
	return useQuery(
		['playerId', playerInfo?.player_id], 
		() => api.getPlayerStats(username), 
		{ 
			enabled: !!playerInfo ,
			onSuccess: handleSuccess,
		}
	)
}