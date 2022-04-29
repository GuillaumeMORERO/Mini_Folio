import React from 'react';

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

export default function links({isMobile}) {

    const user = useSelector(state => state.userReducer);

    const centerer = isMobile ? 'center' : 'flex-end';
    const sizeFont = isMobile ? '.8em' : '1em';
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    return(
        <Box className='marger'>
            <Box sx={{ width: widtherer}}>
                <p>ici, y'aura des liens</p>
            </Box>
        </Box>
    )
}