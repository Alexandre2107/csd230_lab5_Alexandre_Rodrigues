import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../axiosConfig';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/cartItem/cart/1', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setCartItems(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        try {
            console.log(itemId)
            const response = await axios.post(`http://localhost:8080/rest/cart/remove/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response)
            if (response.status === 200) {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            }
        } catch (err) {
            console.error("Failed to remove item from cart:", err);
            setError("Failed to remove item from cart. Please try again.");
        }
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartItems } });
    };

    const handleReturnToMain = () => {
        navigate('/');
    };

    if (loading) return <Typography>Loading cart...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Button variant="contained" onClick={handleReturnToMain} sx={{ marginBottom: 2 }}>
                Return to Main Page
            </Button>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <Box>
                    {cartItems.map((item) => (
                        <Card key={item.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{item.description} </Typography>
                                <Typography>Price: ${item.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Cart;