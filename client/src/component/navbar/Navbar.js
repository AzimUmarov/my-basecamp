import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material";
import userCredentialsContext from "../../context/Credentials/UserCredentialsContext";
import {useContext} from "react";

const pages = ['All projects', 'My Projects', 'Shared with me', 'Create New'];
const settings = ['Profile', 'Logout'];

const MyNavbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();
    const {userCredentials} = useContext(userCredentialsContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" className="">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FilterHdrIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BASECAMP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages?.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link style={{textDecoration: 'none', color: theme.palette.text.primary}} to={page.toLowerCase().split(" ").join("-")} >
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <FilterHdrIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BaseCamp
                    </Typography>
                    <Box sx={{ flexGrow: 1, ml: 0, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            (page === "Create New") ? <Link style={{textDecoration: 'none'}} to={page.toLowerCase().split(" ").join("-")} ><Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx:5, color: 'white', display: 'block', fontWeight: 'bold' }}
                            >
                                {page}
                            </Button> </Link>: <Link style={{textDecoration: 'none'}} to={page.toLowerCase().split(" ").join("-")}>
                            <Button
                                href={page.toLowerCase().split(" ").join("-")}
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx:4, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button> </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <span>{userCredentials?.user.name}{" "}</span>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userCredentials?.user.name} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings?.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Link style={{textDecoration: 'none',  color: theme.palette.text.primary}} to={setting.toLowerCase()} > <Typography textAlign="center" sx={{
                                        width: 100,
                                        textAlign: "left"
                                    }} >{setting}</Typography> </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default MyNavbar;
