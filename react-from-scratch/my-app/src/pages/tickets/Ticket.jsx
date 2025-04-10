import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import TicketList from './TicketList.jsx';
import TicketDetail from './TicketDetail.jsx';
import TicketForm from './TicketForm.jsx';

function Ticket() {
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [ticketsUpdated, setTicketsUpdated] = useState(false);

    const handleTicketSelect = (id) => {
        setSelectedTicketId(id);
    };

    const handleTicketsUpdated = () => {
        setTicketsUpdated(!ticketsUpdated);
        setSelectedTicketId(null); // Reset selected ticket after update
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Ticket Management
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Ticket List</Typography>
                    <TicketList onSelect={handleTicketSelect} ticketsUpdated={ticketsUpdated} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedTicketId ? (
                        <>
                            <Typography variant="h6">Ticket Details</Typography>
                            <TicketDetail ticketId={selectedTicketId} onTicketsUpdated={handleTicketsUpdated} />
                        </>
                    ) : (
                        <Typography variant="body1">Select a ticket to view details.</Typography>
                    )}
                </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Add Ticket</Typography>
                <TicketForm onSubmit={handleTicketsUpdated} />
            </div>
        </div>
    );
}

export default Ticket;