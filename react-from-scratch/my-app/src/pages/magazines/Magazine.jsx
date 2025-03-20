import { useState } from 'react';
import MagazineList from './MagazineList.jsx';
import MagazineForm from './MagazineForm.jsx';
import MagazineDetail from './MagazineDetail.jsx';
import DeleteMagazine from './DeleteMagazine.jsx';

function Magazine() {
    const [selectedMagazineId, setSelectedMagazineId] = useState(null);
    const [magazinesUpdated, setMagazinesUpdated] = useState(false);

    const handleMagazineSelect = (id) => {
        setSelectedMagazineId(id);
    };

    const handleMagazineSubmit = (newMagazine) => {
        setMagazinesUpdated(!magazinesUpdated);
    };

    const handleMagazineDelete = () => {
        setSelectedMagazineId(null);
        setMagazinesUpdated(!magazinesUpdated);
    };

    return (
        <div>
            <h1>Magazine Management</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '300px', marginRight: '20px' }}>
                    <h2>Magazine List</h2>
                    <MagazineList key={magazinesUpdated} onSelect={handleMagazineSelect} />
                </div>
                <div style={{ width: '400px', marginRight: '20px' }}>
                    <h2>Magazine Details</h2>
                    <MagazineDetail magazineId={selectedMagazineId} />
                    {selectedMagazineId && <DeleteMagazine magazineId={selectedMagazineId} onDelete={handleMagazineDelete} />}
                </div>
                <div style={{ width: '400px' }}>
                    <h2>Add/Update Magazine</h2>
                    <MagazineForm onSubmit={handleMagazineSubmit} initialValues={selectedMagazineId ? { id: selectedMagazineId } : null} />
                </div>
            </div>
        </div>
    );
}

export default Magazine;