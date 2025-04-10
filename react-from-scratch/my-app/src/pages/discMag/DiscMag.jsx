import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import DiscMagList from './DiscMagList.jsx';
import DiscMagDetail from './DiscMagDetail.jsx';
import DiscMagForm from './DiscMagForm.jsx';
import axios from 'axios';

function DiscMag() {
    const [selectedDiscMagId, setSelectedDiscMagId] = useState(null);
    const [selectedDiscMag, setSelectedDiscMag] = useState(null);
    const [discMagsUpdated, setDiscMagsUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDiscMagSelect = (id) => {
        setSelectedDiscMagId(id);
    };

    const handleDiscMagsUpdated = () => {
        setDiscMagsUpdated(!discMagsUpdated);
        setSelectedDiscMagId(null);
    };

    useEffect(() => {
        const fetchSelectedDiscMag = async () => {
            if (selectedDiscMagId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/rest/discMag/${selectedDiscMagId}`);
                    setSelectedDiscMag(response.data);
                } catch (err) {
                    console.error('Failed to fetch selected discMag:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedDiscMag(null);
            }
        };

        fetchSelectedDiscMag();
    }, [selectedDiscMagId]);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                DiscMag Management
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">DiscMag List</Typography>
                    <DiscMagList onSelect={handleDiscMagSelect} discMagsUpdated={discMagsUpdated} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedDiscMagId ? (
                        <>
                            <Typography variant="h6">DiscMag Details</Typography>
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <DiscMagDetail discMagId={selectedDiscMagId} onDiscMagsUpdated={handleDiscMagsUpdated} />
                            )}
                            <Typography variant="h6" style={{ marginTop: '20px' }}>
                                Edit DiscMag
                            </Typography>
                            <DiscMagForm
                                initialValues={selectedDiscMag}
                                onSubmit={handleDiscMagsUpdated}
                            />
                        </>
                    ) : (
                        <Typography variant="body1">Select a discMag to view details or edit.</Typography>
                    )}
                </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Add New DiscMag</Typography>
                <DiscMagForm onSubmit={handleDiscMagsUpdated} />
            </div>
        </div>
    );
}

export default DiscMag;