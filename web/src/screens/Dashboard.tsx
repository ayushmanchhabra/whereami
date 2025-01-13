import { AppBar, Avatar, Box, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, MoreVert as MoreIcon, Search as SearchIcon } from '@mui/icons-material'
import React from 'react';
import { useNavigate } from "react-router-dom";

import { useUser } from "providers/hooks";

type Channel = {
    name: string,
    preview: string,
};

const chats: Channel[] = [
    {
        name: 'Admin',
        preview: 'Looks like there is no activity...',
    },
];

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
        if (event.target.id === 'signout') {
            setUser(null);
        }
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                Inbox
            </Typography>
            <List>
                {chats.map((chat: Channel, idx: number) => (
                    <ListItemButton key={idx}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" />
                        </ListItemAvatar>
                        <ListItemText primary={chat.name} secondary={chat.preview} />
                    </ListItemButton>
                ))}
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton> */}
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