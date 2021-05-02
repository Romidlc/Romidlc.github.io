import React, {useState, useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../styles/Home.module.css'
import { UserContext } from '../context/userContext';
import Link from 'next/link';

  const  Header = () =>  {
    const { currentUser, logout } = useContext(UserContext); // get user context
    const [anchorEl, setAnchorEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false) //open or close menu
    
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    }; // when then user click on the menu icon, we should display menu items
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };// close menu 
    
    return (
      <div className={styles.headerContainer}>
        <AppBar position="static">
          <Toolbar>
           <Typography variant="h6" className={styles.headerTitle}>
                 {`Aeromarket Hi, ${currentUser?.name}`}
            </Typography>
            <IconButton edge="start"  color="inherit" aria-label="menu" onClick={handleClickMenu}>
                {!openMenu ? (<img src="/menu.svg" width="18px" />) : (<img src="/iconClose.svg" width="15px" />)}
            </IconButton> 
            <Menu id="fade-menu"
                   anchorEl={anchorEl}
                   keepMounted
                   open={Boolean(anchorEl)}
                   onClose={handleCloseMenu}>
                <Link href="redeem-history">
                  <MenuItem onClick={(e)=> setAnchorEl(e.currentTarget)}>Exchanges</MenuItem>
                </Link>
                <MenuItem onClick={()=>  logout()}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  export default Header;