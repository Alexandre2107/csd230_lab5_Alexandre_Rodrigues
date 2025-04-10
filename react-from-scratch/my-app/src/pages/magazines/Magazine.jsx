import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import MagazineList from './MagazineList.jsx';
import MagazineDetail from './MagazineDetail.jsx';
import MagazineForm from './MagazineForm.jsx';
import axios from 'axios';

function Magazine() {
    const [selectedMagazineId, setSelectedMagazineId] = useState(null);
    const [selectedMagazine, setSelectedMagazine] = useState(null);
    const [magazinesUpdated, setMagazinesUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleMagazineSelect = (id) => {
        setSelectedMagazineId(id);
    };

    const handleMagazinesUpdated = () => {
        setMagazinesUpdated(!magazinesUpdated);
        setSelectedMagazineId(null);
    };

    useEffect(() => {
        const fetchSelectedMagazine = async () => {
            if (selectedMagazineId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/rest/magazine/${selectedMagazineId}`);
                    setSelectedMagazine(response.data);
                } catch (err) {
                    console.error('Failed to fetch selected magazine:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedMagazine(null);
            }
        };

        fetchSelectedMagazine();
    }, [selectedMagazineId]);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Magazine Management
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Magazine List</Typography>
                    <MagazineList onSelect={handleMagazineSelect} magazinesUpdated={magazinesUpdated} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedMagazineId ? (
                        <>
                            <Typography variant="h6">Magazine Details</Typography>
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <MagazineDetail magazineId={selectedMagazineId} onMagazinesUpdated={handleMagazinesUpdated} />
                            )}
                            <Typography variant="h6" style={{ marginTop: '20px' }}>
                                Edit Magazine
                            </Typography>
                            <MagazineForm
                                initialValues={selectedMagazine}
                                onSubmit={handleMagazinesUpdated}
                            />
                        </>
                    ) : (
                        <Typography variant="body1">Select a magazine to view details or edit.</Typography>
                    )}
                </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Add New Magazine</Typography>
                <MagazineForm onSubmit={handleMagazinesUpdated} />
            </div>
        </div>
    );
}

export default Magazine;