import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemButton, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <AppBar position="fixed" style={{ width: '100%' }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={toggleDrawer}
                        style={{
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/logout" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="error">
                            Logout
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer open={isOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemText primary="Menu" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/book">
                            <ListItemText primary="Books" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/magazine">
                            <ListItemText primary="Magazines" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/discMag">
                            <ListItemText primary="DiscMags" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/ticket">
                            <ListItemText primary="Tickets" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/cart">
                            <ListItemText primary="Cart" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Sidebar;