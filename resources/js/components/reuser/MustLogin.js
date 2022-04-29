import React from 'react';

import { useHistory  } from "react-router-dom";

import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function mustLogin() {
    
    const history = useHistory();
    
    return (
        <Box className='marger'>
            <Card sx={{}} className="cardShadower">
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Typography variant='h4' sx={{padding:'1em'}}>Vous devez être connecté pour voir cette page !</Typography>
                    <Button 
                        className="btnValid"
                        onClick={() => history.push("/login")}
                        variant="outlined"
                        sx={{margin:'1em', width:'-webkit-fill-available'}}
                    >
                        Login
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}