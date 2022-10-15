import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import useMediaQuery from "./utilities/useMediaQuery"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ErrorComponent, { SetErrorContext } from "./ErrorComponent"

import NavBar from "./NavBar"
import SideBar from "./SideBar"
import PlayerProfile from "./player-component/PlayerProfile"
import SearchBar from "./search-bar-component/SearchBar"

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function App() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, } } })
    const isIphone = useMediaQuery('(max-width: 576px)')
    // const navigate = useNavigate()
    const [error, setError] = useState({value: false,type: "searchbar",message: ""})
    const [inputs, setInputs] = useState({username: null,startDate: null,endDate: null})
    const [player, setPlayer] = useState({username: null,startDate: null,endDate: null,})

    const [games, setGames] = useState({
        isFetch: false,
    })

    useEffect(() => {
        console.log('1. Inputs are saved, fetch time', inputs)
    }, [inputs])

    useEffect(() => {
        if (!!player.username) {
            console.log('2. Player is found, fetch game time', player)
        }
    }, [player])

    useEffect(() => {
        if (error.type === "player") {
            setInputs({inputs: null, startDate: null, endDate: null})
        }
    }, [error])

    // const [state, setState] = useState(true)
    // useEffect(() => {
    //     console.count("Render")
    //     setTimeout(() => {
    //     setState(!state)
    //     }, 1000)
    // })
    return (
        <>
        <NavBar />
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <SetErrorContext.Provider value={setError}>
                        <SideBar {...player}>
                            <QueryClientProvider client={queryClient}>
                                <div>
                                fetching
                                </div>
                                { isIphone && <PlayerProfile {...inputs} setPlayer={setPlayer}/> }
                            </QueryClientProvider>
                            { isIphone && <SearchBar setInputs={setInputs}/> }
                        </SideBar>
                        <QueryClientProvider client={queryClient}>
                            { !isIphone && <PlayerProfile {...inputs} setPlayer={setPlayer}/> }
                        </QueryClientProvider>
                    </SetErrorContext.Provider>
                </div>
                <div className="col-lg-9">
                    <SetErrorContext.Provider value={setError}>
                        { error?.value && <ErrorComponent error={error}/> }
                        { !isIphone && <SearchBar setInputs={setInputs} /> }
                        <Outlet />
                    </SetErrorContext.Provider>
                </div>
            </div>
        </div>
    </>
    )
}

export default App