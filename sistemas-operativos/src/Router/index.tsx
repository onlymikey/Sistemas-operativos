import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../pages/Homepage";
import First from "../pages/FirstHomework";
import Second from "../pages/SecondHomework";
import DescriptionFirst from "../pages/DescriptionFirst";
import DescriptionSecond from "../pages/DescriptionSecond";

export default function AppRouter(): JSX.Element{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/workspace/first-homework" element={<First/>}/>
                <Route path="/workspace/second-homework" element={<Second/>}/>
                <Route path="/about/first" element={<DescriptionFirst/>}/>
                <Route path="/about/second" element={<DescriptionSecond/>}/>
            </Routes>
        </BrowserRouter>
    )
}