import React, { useState, useEffect } from "react"

import { Outlet } from "react-router-dom"
import useMediaQuery from "./utilities/useMediaQuery"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ErrorComponent, { SetErrorContext } from "./ErrorComponent"

import NavBar from "./NavBar"
import SideBar from "./SideBar"
import PlayerProfile from "./PlayerProfile"
import SearchBar from "./search-bar-component/SearchBar"

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function App() {
    const queryClient = new QueryClient()
    const isIphone = useMediaQuery('(max-width: 576px)')
    const [error, setError] = useState({
        value: false,
        type: "searchbar",
        message: "",
    })
    const [inputs, setInputs] = useState({
        username: null,
        startDate: null,
        endDate: null,
    })

    useEffect(() => {
        console.log('1. Inputs are saved, fetch time', inputs.username)
    }, [inputs])

    const [state, setState] = useState(true)
    useEffect(() => {
        console.count("Render")
        setTimeout(() => {
        setState(!state)
        }, 1000)
    })
    return (
        <>
        <NavBar />
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <SetErrorContext.Provider value={setError}>
                        { isIphone && error?.value && <ErrorComponent error={error}/> }
                            <SideBar>
                                <QueryClientProvider client={queryClient}>
                                    { isIphone && <PlayerProfile {...inputs} /> }
                                </QueryClientProvider>
                                { isIphone && <SearchBar setInputs={setInputs}/> }
                            </SideBar>
                        <QueryClientProvider client={queryClient}>
                            <QueryClientProvider client={queryClient}>
                                { !isIphone && <PlayerProfile {...inputs} /> }
                            </QueryClientProvider>
                        </QueryClientProvider>
                    </SetErrorContext.Provider>
                </div>
                <div className="col-lg-9">
                    <SetErrorContext.Provider value={setError}>
                        { !isIphone && error?.value && <ErrorComponent error={error}/> }
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