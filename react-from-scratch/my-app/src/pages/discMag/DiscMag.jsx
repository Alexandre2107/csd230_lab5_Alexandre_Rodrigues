import { useState } from 'react';
import DiscMagList from './DiscMagList.jsx';
import DiscMagForm from './DiscMagForm.jsx';
import DiscMagDetail from './DiscMagDetail.jsx';
import DeleteDiscMag from './DeleteDiscMag.jsx';

function DiscMag() {
    const [selectedDiscMagId, setSelectedDiscMagId] = useState(null);
    const [discMagsUpdated, setDiscMagsUpdated] = useState(false);

    const handleDiscMagSelect = (id) => {
        setSelectedDiscMagId(id);
    };

    const handleDiscMagSubmit = (newDiscMag) => {
        setDiscMagsUpdated(!discMagsUpdated);
    };

    const handleDiscMagDelete = () => {
        setSelectedDiscMagId(null);
        setDiscMagsUpdated(!discMagsUpdated);
    };

    return (
        <div>
            <h1>DiscMag Management</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '300px', marginRight: '20px' }}>
                    <h2>DiscMag List</h2>
                    <DiscMagList key={discMagsUpdated} onSelect={handleDiscMagSelect} />
                </div>
                <div style={{ width: '400px', marginRight: '20px' }}>
                    <h2>DiscMag Details</h2>
                    <DiscMagDetail discMagId={selectedDiscMagId} />
                    {selectedDiscMagId && <DeleteDiscMag discMagId={selectedDiscMagId} onDelete={handleDiscMagDelete} />}
                </div>
                <div style={{ width: '400px' }}>
                    <h2>Add/Update DiscMag</h2>
                    <DiscMagForm onSubmit={handleDiscMagSubmit} initialValues={selectedDiscMagId ? { id: selectedDiscMagId } : null} />
                </div>
            </div>
        </div>
    );
}

export default DiscMag;