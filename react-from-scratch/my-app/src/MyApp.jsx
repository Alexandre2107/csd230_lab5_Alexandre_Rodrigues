import { Link } from 'react-router';

function MyApp() {
    return (
        <div style={{ textAlign: 'center'}}>
            <h1>Welcome to the Simple E-Commerce App</h1>
            <Link to="/book">Go to Book Management</Link>
            <Link style={{marginLeft: 20 }} to={"/magazine"}>Go to Magazine Management</Link>
            <Link style={{marginLeft: 20 }} to={"/discMag"}>Go to DiscMag Management</Link>
            <Link style={{marginLeft: 20 }} to={"/ticket"}>Go to Ticket Management</Link>
        </div>
    );
}

export default MyApp;