import { Typography, Paper, Grid } from '@mui/material';

function MyApp() {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '20px' }}>
            <Grid item xs={12} sm={10} md={8}>
                <Paper elevation={3} style={{ padding: '30px', textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>
                        Welcome to the Simple E-Commerce App
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                        Select an option from the menu to get started.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MyApp;