import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import './index.css';

import App from './App';
import BoardComponent from "./BoardComponent";
import GameComponent from "./GameComponent";
import TwitchComponent from "./TwitchComponent";


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
            path: "game",
            element: <GameComponent />,
        },
        {
            path: "board",
            element: <BoardComponent />,
        },
        {
            path: "twitch",
            element: <TwitchComponent />,
        },]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);