import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import MyApp from './MyApp.jsx';
import Book from './pages/book/Book.jsx';
import Magazine from './pages/magazines/Magazine.jsx';
import DiscMag from './pages/discMag/DiscMag.jsx';
import Ticket from './pages/tickets/Ticket.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import AuthProvider from './provider/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MyApp />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/book" element={<Book />} />
                    <Route path="/magazine" element={<Magazine />} />
                    <Route path="/discMag" element={<DiscMag />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);