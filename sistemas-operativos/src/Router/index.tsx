import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../pages/Homepage";
import First from "../pages/FirstHomework";

export default function AppRouter(): JSX.Element{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/workspace/first-homework" element={<First/>}/>
            </Routes>
        </BrowserRouter>
    )
}