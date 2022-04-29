import React from 'react';

import TextField from '@mui/material/TextField';

export default function OneInput(props) {

    const handling = props.fct;
    const handler = (e) => {
        handling(e);
    }
    return (
        <TextField
            sx={{
                mt:2, width: '100%',
                '& .MuiInputLabel-root': {color:'#00B899', fontSize:props.sizeFont},
                '& .MuiInput-input': {color:'#00B899', fontSize:props.sizeFont},
                '& .MuiInput-root': {color:'#00B899', fontSize:props.sizeFont},
            }}
            id={props.id}
            label={props.label}
            defaultValue={props.value}
            onChange={e => handler(e.target.value)}
            variant="standard"
            error={props.error}
            required={props.required}
            onBlur={props.blur}
        />
    )
} 