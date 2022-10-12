import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import './index.css';

import App from './App';
import BoardComponent from "./board-component/BoardComponent";
import GamesComponent from "./games-component/GamesComponent";
import TwitchComponent from "./twitch-component/TwitchComponent";


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        {
            path: "games",
            element: <GamesComponent />,
        },
        {
            path: "board",
            element: <BoardComponent />,
        },
        {
            path: "twitch",
            element: <TwitchComponent />,
        },
        {
            path: "*",
            element: <h1>Not Found</h1>
        },]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);