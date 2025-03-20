import { useState } from 'react';
import TicketList from './TicketList.jsx';
import TicketForm from './TicketForm.jsx';
import TicketDetail from './TicketDetail.jsx';
import DeleteTicket from './DeleteTicket.jsx';

function Ticket() {
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [ticketsUpdated, setTicketsUpdated] = useState(false);

    const handleTicketSelect = (id) => {
        setSelectedTicketId(id);
    };

    const handleTicketSubmit = (newTicket) => {
        setTicketsUpdated(!ticketsUpdated);
    };

    const handleTicketDelete = () => {
        setSelectedTicketId(null);
        setTicketsUpdated(!ticketsUpdated);
    };

    return (
        <div>
            <h1>Ticket Management</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '300px', marginRight: '20px' }}>
                    <h2>Ticket List</h2>
                    <TicketList key={ticketsUpdated} onSelect={handleTicketSelect} />
                </div>
                <div style={{ width: '400px', marginRight: '20px' }}>
                    <h2>Ticket Details</h2>
                    <TicketDetail ticketId={selectedTicketId} />
                    {selectedTicketId && <DeleteTicket ticketId={selectedTicketId} onDelete={handleTicketDelete} />}
                </div>
                <div style={{ width: '400px' }}>
                    <h2>Add/Update Ticket</h2>
                    <TicketForm onSubmit={handleTicketSubmit} initialValues={selectedTicketId ? { id: selectedTicketId } : null} />
                </div>
            </div>
        </div>
    );
}

export default Ticket;