import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import { TextField, Button, Typography, Paper, Grid, Box } from "@mui/material";
import axios from "axios";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/rest/auth/login', { email, password });
            setToken(response.data.token);
            navigate("/", { replace: true });
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;