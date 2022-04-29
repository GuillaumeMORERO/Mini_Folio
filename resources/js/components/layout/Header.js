import React from 'react';
import { useHistory  } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

import Typography from "@mui/material/Typography";
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';


function Header(props) {

    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const HSize = props.isMobile ? 'h6' : 'h4';

    const [anchorEl, setAnchorEl] = React.useState(false);

    function logout() { dispatch(logoutUser());}

    function btnLog() {
        if(user.loggedin) {
            const handleClick = (event) => {setAnchorEl(event.currentTarget);};
          
            const handleClose = () => {setAnchorEl(null);};
          
            const openPop = Boolean(anchorEl);
            const id = openPop ? 'simple-popover' : undefined;
            return (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Link href="#" underline="hover" variant="contained" onClick={handleClick}>
                        {user.name}
                        <ExpandMoreIcon />
                    </Link>
                    <Popover
                        id={id}
                        open={openPop}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Link href="#" underline="hover" variant="contained" sx={{m:1}} onClick={() => logout()}>Log out</Link>
                        <Link href="#" underline="hover" variant="contained" sx={{m:1}} onClick={() => history.push('profile')}>Profile</Link>
                    </Popover>
                </Box>
            )
        }
        else {
            return (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Link href="#" underline="hover" variant="contained" onClick={() => history.push("/login")}>log in</Link>
                    <Link href="#" underline="hover" variant="contained" onClick={() => history.push("/register")}>register</Link>
                </Box>
                
            ) 
        }
    }

    return (
        <div className="header">
            <div className="header-title">
                <div className="header-appName" onClick={()=>history.push("/")}>
                    <Typography ml={2} variant={HSize} >Web test APIs</Typography>
                    <Typography sx={{ml:2}} variant="p" className="secondTitle" > - React SPA</Typography>
                </div>
                {btnLog()}
            </div>
        </div>
    );
}

export default Header;