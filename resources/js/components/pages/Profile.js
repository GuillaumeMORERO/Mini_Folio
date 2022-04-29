import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUserData } from '../../redux/actions/userActions';

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardMedia from '@mui/material/CardMedia';

import OneInput from '../reuser/OneInput';
import OneFormControl from '../reuser/OneFormControl';

export default function profileComponent({isMobile}) {

    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        name: user.name,
        email: user.email,
        num_tel: user.num_tel
    });
    const centerer = isMobile ? 'center' : 'flex-end';
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event });
    };

    function handleSubmit() {
        dispatch(postUserData(values));
    }

    function avatarer() {
        // faudra construire cet url dans le middleware, et l'envoyer dans le reducer
        const avatar_URL = (process.env.NODE_ENV == 'production') ? `https://guimor.fr/avatars/${user.avatar_url}` : `http://minifolio.test/avatars/${user.avatar_url}`;
        if(user.avatar_url != '') {
            return (
                <CardMedia
                    component="img"
                    image={avatar_URL}
                    alt="test avatar"
                    sx={{height: 100, width: 100}}
                />
            )
        }
        else {
            return(<AccountCircleIcon  sx={{fontSize:100, color:'#00B899'}}/>)
        }
    }

    return (

        <div className="marger">
            <Box sx={{ width: widtherer, mt:2 }}>
                <Card className="cardShadower">
                    <Box className="box-card-header" sx={{}}>
                        {avatarer()}
                        <Typography variant="h6" sx={{color:'#00B899', padding: '.5em', display: 'flex', justifyContent:'center'}}>Profile</Typography>
                        <Typography variant="p" sx={{color:'#00B899', paddingBottom: '.5em', display: 'flex', justifyContent:'center'}}>Modifiez vos données personnelles</Typography>
                    </Box>
                    <CardContent sx={{display:'flex', justifyContent:'center'}} >
                        <Box sx={{width: '90%', display:'flex', flexDirection:'column'}}>

                            <OneInput id="profile-name" label="Nom" value={values.name} fct={handleChange('name')} error={false} required={false}/>

                            <OneInput id="profile-email" label="Email" value={values.email} fct={handleChange('email')} error={false} required={false}/>

                            <OneFormControl 
                                id="profile-num_tel" 
                                label="N° tel" 
                                value={values.num_tel} 
                                fct={handleChange('num_tel')} 
                                error={false}
                                adornmentStart={<InputAdornment position="start">+ 033</InputAdornment>}
                            />
                        </Box>
                    </CardContent>
                    <CardActions sx={{justifyContent:centerer, m:2}}>
                        <Button 
                            className="btnValid"
                            onClick={() => {handleSubmit(); }}
                            variant="outlined"
                        >
                            Valider
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    )
}