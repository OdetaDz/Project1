import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from './context/UserContext';
import { PostsProvider } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
        <PostsProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PostsProvider>
    </UsersProvider>
);