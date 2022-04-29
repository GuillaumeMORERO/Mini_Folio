import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function spinner() {
    return (
        <Box className='boxSpinner'>
            <CircularProgress sx={{}} />
        </Box>
    )
}