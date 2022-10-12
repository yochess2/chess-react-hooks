import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import NavBar from "./NavBar"
import SideBar from "./SideBar"
import SearchBar from "./search-bar-component/SearchBar"

import ErrorComponent, { ErrorContext } from "./ErrorComponent"
import useMediaQuery from "./utilities/useMediaQuery"

function App() {
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
        console.log('fetch time')
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
                    <ErrorContext.Provider value={{error, setError}}>
                        { isIphone && error?.value && <ErrorComponent /> }
                        <SideBar>
                            { isIphone && <SearchBar handleSubmit={handleSubmit}/> }
                        </SideBar>
                    </ErrorContext.Provider>
                </div>
                <div className="col-lg-9">
                    <ErrorContext.Provider value={{error, setError}}>
                        { !isIphone && error?.value && <ErrorComponent /> }
                        { !isIphone && <SearchBar handleSubmit={handleSubmit}/> }
                        <Outlet />
                    </ErrorContext.Provider>

                </div>
            </div>
        </div>
    </>
    )

    function handleSubmit(username, startDate, endDate) {
        setInputs({username, startDate, endDate})

    }
}

export default App