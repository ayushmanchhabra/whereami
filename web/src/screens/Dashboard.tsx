import { AppBar, Box, IconButton, List, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { MoreVert as MoreIcon } from '@mui/icons-material'
import React from 'react';
import { useNavigate } from "react-router-dom";

import { signout } from "providers/api";
import { useUser } from "providers/hooks";

function Dashboard(): JSX.Element {

    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        if (user === null) {
            navigate('/signin');
        }
    }, [user]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: any) => {
        setAnchorEl(null);
        if (event.target.id === 'signout') {
            signout().then(() => {
                setUser(null);
            })
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                Inbox
            </Typography>
            <List>

                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit" onClick={handleClick} sx={{ height: 50, width: 50 }}>
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </List>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem id='signout' onClick={handleClose}>Signout</MenuItem>
            </Menu>
        </Box>
    );
}

export default Dashboard;