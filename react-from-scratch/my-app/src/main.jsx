import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MyApp from "./MyApp.jsx";
import Book from "./pages/book/Book.jsx";
import Magazine from "./pages/magazines/Magazine.jsx";
import DiscMag from "./pages/discMag/DiscMag.jsx";
import Ticket from "./pages/tickets/Ticket.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MyApp />} />
            <Route path="/book" element={<Book />} />
            <Route path={"/magazine"} element={<Magazine/>} />
            <Route path={"/discMag"} element={<DiscMag/>}/>
            <Route path={"/ticket"} element={<Ticket/>}/>
        </Routes>
    </BrowserRouter>
);