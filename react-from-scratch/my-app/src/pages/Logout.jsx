import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import { Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { useEffect } from "react";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setToken();
            navigate("/", { replace: true });
        }, 1000);

        return () => clearTimeout(timer);
    }, [setToken, navigate]);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={4}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Logging out...
                    </Typography>
                    <CircularProgress />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Logout;