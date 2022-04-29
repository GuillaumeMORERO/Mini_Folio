import React from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import OneInput from '../reuser/OneInput';
 
export default function Login(props) {

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event });
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const centerer = props.isMobile ? 'center' : 'flex-end';
    const sizeFont = props.isMobile ? '.8em' : '1em';
    const widtherer = props.isMobile ? '-webkit-fill-available' : '75%';

    React.useEffect(()=>{
        // si le user est co, on le redirige vers home "/"
        if (localStorage.length > 0) { history.push("/");}
    }, []);

    const handleSubmit = () => {
        dispatch(loginUser({
            password: values.password,
            email: values.email,
        }));
    }

    return (
        <div className="marger">
            <Box sx={{ width: widtherer }}>
                <Card className="cardShadower">
                    <Box className="box-card-header" sx={{}}>
                        <Typography variant="h6" sx={{color:'#00B899', padding: '.5em', display: 'flex', justifyContent:'center'}}>Login</Typography>
                    </Box>
                    <CardContent sx={{display:'flex', justifyContent:'center'}}>
                        <Box id="rgtsvrsdvt" sx={{width: '90%', display:'flex', flexDirection:'column'}}>

                            <OneInput id="login-email" label="Email" value={values.email} fct={handleChange('email')} error={false} required={true} sizeFont={sizeFont}/>

                            <OneInput id="login-pass" label="Mot de passe" value={values.password} fct={handleChange('password')} error={false} required={true} sizeFont={sizeFont}/>

                        </Box>
                    </CardContent>
                    <CardActions sx={{justifyContent:centerer, m:2}}>
                        <Button 
                            className="btnValid"
                            onClick={() => {handleSubmit(); }}
                            variant="outlined"
                        >
                            Connexion
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}
