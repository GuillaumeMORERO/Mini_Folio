import React from 'react';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function OneInput(props) {

    const handling = props.fct;
    const handler = (e) => {
        handling(e);
    }
    return (

        <FormControl
            sx={{
                my:2,
                '& .MuiInputLabel-root': {color:'#00B899', fontSize: props.sizeFont},
                '& .MuiInput-input': {color:'#00B899', fontSize: props.sizeFont},
                '& .MuiInput-root': {color:'#00B899', fontSize: props.sizeFont},
            }} 
            variant="standard"
        >
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <Input
                id={props.id}
                value={props.value}
                onChange={e => handler(e.target.value)}
                error={props.error}
                startAdornment={props.adornmentStart}
                endAdornment={props.adornmentEnd}
            />
        </FormControl>

    )
} 