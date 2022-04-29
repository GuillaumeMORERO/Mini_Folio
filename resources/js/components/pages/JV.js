import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {requestJvList} from '../../redux/actions/jvActions';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function links({isMobile}) {

    // const user = useSelector(state => state.userReducer);

    const centerer = isMobile ? 'center' : 'flex-end';
    const sizeFont = isMobile ? '.8em' : '1em';
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    const dispatch = useDispatch();

    function apiKall() {
        dispatch(requestJvList());
    }

    return(
        <Box className='marger'>
            <Box sx={{ width: widtherer}}>
                <p>ici, y'aura des JV !!</p>
                <Button variant="outlined" onClick={() => {apiKall()}}>test jv</Button>
            </Box>
        </Box>
    )
}