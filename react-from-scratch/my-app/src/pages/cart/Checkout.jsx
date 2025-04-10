import React from 'react';
import { useLocation } from 'react-router';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

function Checkout() {
    const location = useLocation();
    const cartItems = location.state?.cartItems || []; // Retrieve cartItems from state

    if (cartItems.length === 0) {
        return <Typography>No items in the cart to checkout.</Typography>;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleReturnToCart = () => {
        window.history.back();
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Button variant="contained" onClick={handleReturnToCart} sx={{ marginBottom: 2 }}>
                Return to Cart
            </Button>
            <Typography variant="h4" gutterBottom>
                Invoice
            </Typography>
            {cartItems.map((item) => (
                <Card key={item.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{item.description}</Typography>
                        <Typography>Price: ${item.price}</Typography>
                    </CardContent>
                </Card>
            ))}
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Total: ${total.toFixed(2)}
            </Typography>
        </Box>
    );
}

export default Checkout;