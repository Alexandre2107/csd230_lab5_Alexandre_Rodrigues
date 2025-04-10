import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import MyApp from './MyApp.jsx';
import Book from './pages/book/Book.jsx';
import Magazine from './pages/magazines/Magazine.jsx';
import DiscMag from './pages/discMag/DiscMag.jsx';
import Ticket from './pages/tickets/Ticket.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import Cart from './pages/cart/Cart.jsx';
import Checkout from './pages/cart/Checkout.jsx';
import AuthProvider from './provider/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Sidebar from "./pages/SideBar.jsx";

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <AuthProvider>
        <BrowserRouter>
            <div style={{ paddingTop: '64px' }}>
                <Sidebar />
                {/* Other content */}
            </div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MyApp />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/book" element={<Book />} />
                    <Route path="/magazine" element={<Magazine />} />
                    <Route path="/discMag" element={<DiscMag />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);