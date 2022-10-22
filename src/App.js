import React, { useState, useEffect, useMemo } from "react"
import { Outlet } from "react-router-dom"

import useMediaQuery from "./utilities/useMediaQuery"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ErrorComponent, { SetErrorContext } from "./ErrorComponent"
import ChessWebApi from "chess-web-api"

import NavBar from "./NavBar"
import SideBar from "./SideBar"
import PlayerSide from "./player-component/PlayerSide"

import SearchBar from "./search-bar-component/SearchBar"

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function App() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, } } })
    // const isIphone = useMediaQuery('(max-width: 576px)')
    const isLarge = useMediaQuery('(min-width: 992px)')
    // const navigate = useNavigate()
    const [error, setError] = useState({value: false,type: "searchbar",message: ""})
    const [username, setUsername] = useState(null)

    const api = useMemo(() => {
        return new ChessWebApi({queue:true})
    }, [])

    const [player, setPlayer] = useState({
        username: null,
        name: null,
        avatar: null,
        joined: null,
        startDate: null,
        last: null,
        lastOnline: null,
        title: null,
        fide: null,
        blitz: null,
        bullet: null,
        daily: null,
        rapid: null,
        lessons: null,
        puzzle_rush: null,
        tactics: null,

    })

    // const [games, setGames] = useState({
    //     isFetch: false,
    // })

    useEffect(() => {
        console.log('1. Inputs are saved, fetch time', username)
    }, [username])

    useEffect(() => {
        if (!!player.username) {
            console.log('2. Player is found, fetch game time', player)
        }
    }, [player])

    useEffect(() => {
        if (error.type === "player") {
            setUsername(null)
        }
    }, [error])

    // const [state, setState] = useState(true)
    // useEffect(() => {
    //     console.count("Render")
    //     setTimeout(() => {
    //     setState(!state)
    //     }, 1000)
    // })
    return (<>
        <NavBar username={username}>
            <SetErrorContext.Provider value={setError}>
                { isLarge && <SearchBar setParentUsername={setUsername}/> }
            </SetErrorContext.Provider>
        </NavBar>

        <div className="container">
            <div className="row">
                <div className="col-lg-3">

                    <SideBar {...player} username={username}>
                        <SetErrorContext.Provider value={setError}>
                            { !isLarge && <SearchBar setParentUsername={setUsername}/> }
                        </SetErrorContext.Provider>
                    </SideBar>

                        <QueryClientProvider client={queryClient}>
                            <SetErrorContext.Provider value={setError}>
                                { isLarge && <PlayerSide player={player} /> }
                            </SetErrorContext.Provider>
                        </QueryClientProvider>

                </div>
                <div className="col-lg-9">

                    <SetErrorContext.Provider value={setError}>
                        { error?.value && <ErrorComponent error={error}/> }
                    </SetErrorContext.Provider>

                    <QueryClientProvider client={queryClient}>
                        <SetErrorContext.Provider value={setError}>
                            <Outlet context={[setPlayer, api]}/>
                        </SetErrorContext.Provider>
                    </QueryClientProvider>

                </div>
            </div>
        </div>
</>)
}

export default App