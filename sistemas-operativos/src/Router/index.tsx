import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("../pages/Homepage"));
const First = lazy(() => import("../pages/FirstHomework"));
const Second = lazy(() => import("../pages/SecondHomework"));
const Third = lazy(() => import("../pages/ThirdHomework"));
const Fourth = lazy(() => import("../pages/FourthHomework"));
const Fifth = lazy(() => import("../pages/FifthHomework"));
const Sixth = lazy(() => import("../pages/SixthHomework"));
const Seventh = lazy(() => import("../pages/SevenHomework"));
const Eight = lazy(() => import("../pages/EightHomework"));
const DescriptionFirst = lazy(() => import("../pages/DescriptionFirst"));
const DescriptionSecond = lazy(() => import("../pages/DescriptionSecond"));
const DescriptionThird = lazy(() => import("../pages/DescriptionThird"));
const DescriptionFourth = lazy(() => import("../pages/DescriptionFourth"));
const DescriptionFifth = lazy(() => import("../pages/DescriptionFifth"));
const DescriptionSixth = lazy(() => import("../pages/DescriptionSixth"));
const DescriptionSeventh = lazy(() => import("../pages/DescriptionSeventh"));
const DescriptionEighth = lazy(() => import("../pages/DescriptionEight"));
const DocumentFirst = lazy(() => import("../pages/Document/First"));
const DocumentSecond = lazy(() => import("../pages/Document/Second"));
const DocumentThird = lazy(() => import("../pages/Document/Third"));
const DocumentFourth = lazy(() => import("../pages/Document/Fourth"));
const DocumentFifth = lazy(() => import("../pages/Document/Fifth"));
const DocumentSixth = lazy(() => import("../pages/Document/Sixth"));
const DocumentSeventh = lazy(() => import("../pages/Document/Seventh"));
const DocumentEighth = lazy(() => import("../pages/Document/Eighth"));
export default function AppRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/first" element={<DocumentFirst />} />
                    <Route path="/second" element={<DocumentSecond />} />
                    <Route path="/third" element={<DocumentThird />} />
                    <Route path="/fourth" element={<DocumentFourth />} />
                    <Route path="/fifth" element={<DocumentFifth />} />
                    <Route path="/sixth" element={<DocumentSixth />} />
                    <Route path="/seventh" element={<DocumentSeventh />} />
                    <Route path="/eighth" element={<DocumentEighth />} />
                    <Route path="/workspace/first-homework" element={<First />} />
                    <Route path="/workspace/second-homework" element={<Second />} />
                    <Route path="/workspace/third-homework" element={<Third />} />
                    <Route path="/workspace/fourth-homework" element={<Fourth />} />
                    <Route path="/workspace/fifth-homework" element={<Fifth />} />
                    <Route path="/workspace/sixth-homework" element={<Sixth />} />
                    <Route path="/workspace/seventh-homework" element={<Seventh />} />
                    <Route path="/workspace/eighth-homework" element={<Eight />} />
                    <Route path="/about/first" element={<DescriptionFirst />} />
                    <Route path="/about/second" element={<DescriptionSecond />} />
                    <Route path="/about/third" element={<DescriptionThird />} />
                    <Route path="/about/fourth" element={<DescriptionFourth />} />
                    <Route path="/about/fifth" element={<DescriptionFifth />} />
                    <Route path="/about/sixth" element={<DescriptionSixth />} />
                    <Route path="/about/seventh" element={<DescriptionSeventh />} />
                    <Route path="/about/eighth" element={<DescriptionEighth />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}