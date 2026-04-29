import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import "./index.css"
import {store} from "./app/store.ts"
import {Provider} from "react-redux";
import "./shared/extentions/stringExtention.ts"
import "tailwindcss";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/*"} element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
