import React from 'react';

import { useDispatch } from 'react-redux';
import { registerUser, setError } from '../../redux/actions/userActions';


import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import OneInput from '../reuser/OneInput';
import OneFormControl from '../reuser/OneFormControl';
 
export default function Register(props) {

    const dispatch = useDispatch();
    const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function errorModaler(message) {
        dispatch(setError({title: 'Erreur de saisie', message: message, cat: 'registerError'}));
    }

    const centerer = props.isMobile ? 'center' : 'flex-end';
    const sizeFont = props.isMobile ? '.8em' : '1em';
    const widtherer = props.isMobile ? '-webkit-fill-available' : '75%';

    const [values, setValues] = React.useState({
        emailRegister: '',
        passwordRegister: '',
        passwordRegisterConfirm: '',
        nameRegister: '',
        showPassword: false,
        num_tel: ''
    });
    const [errors, setErrors] = React.useState({
        nameRegister: {error: false, message: ''},
        emailRegister: {error: false, message: ''},
        passwords: {error: false, message: ''},
        num_tel: {error: false, message: ''}
    });

    const handleChange = (prop) => (event) => { // pass et passConfirm
        let value = '';
        if( (prop == 'passwordRegister') || (prop == 'passwordRegisterConfirm') ) {
            value = event.target.value;
        }else {
            value = event;
        }
        setValues({ ...values, [prop]: value });
    };
    const handleClickShowPassword = () => { // pour passer de text à showpass
        setValues({...values,showPassword: !values.showPassword});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const checker = (whatToCheck) => (event) => {
        if ((whatToCheck == 'name') && (values.nameRegister.length > 15)) {
            setErrors({ ...errors, nameRegister: {error: true, message: '10 lettres maximum'} })
        } else {setErrors({ ...errors, nameRegister: {error: false, message: ''} })}

        if ((whatToCheck == 'num_tel') && (values.num_tel.length > 13)) {
            setErrors({ ...errors, num_tel: {error: true, message: 'Numero saisi invalide'} })
        } else {setErrors({ ...errors, num_tel: {error: false, message: ''} })}

        if((whatToCheck == 'email') && (!values.emailRegister.match(mailPattern)) ) {
            setErrors({ ...errors, emailRegister: {error: true, message: 'Cet email doit être valide'} })
        } else {setErrors({...errors, emailRegister: {error: false, message: ''} })}

        if( (whatToCheck == 'pass') && (values.passwordRegister!='') && (values.passwordRegisterConfirm!='') && (values.passwordRegister != values.passwordRegisterConfirm) ) {
            setErrors({ ...errors, passwords: {error: true, message: 'Les mots de passe ne correspondent pas.'} })
        } else {setErrors({ ...errors, passwords: {error: false, message: ''} })}
    }

    const handleSubmitRegister = () => {
        if(values.nameRegister=='') {
            setErrors({ ...errors, nameRegister: {error: true, message: 'Vous n\'avez pas saisi de nom !'} })
        }
        else if(values.emailRegister=='') {
            setErrors({ ...errors, emailRegister: {error: true, message: 'Veuillez saisir un email'} })
        }
        else if((values.passwordRegister=='') || (values.passwordRegisterConfirm=='')) {
            setErrors({ ...errors, passwords: {error: true, message: 'Vous n\'avez pas saisi ou confirmé le mot de passe !'} })
        }
        else {
            dispatch(registerUser({
                password: values.passwordRegister,
                email: values.emailRegister,
                name: values.nameRegister,
                num_tel: values.num_tel
            }));
        };
    };

    return (
        <div className="marger">
            <Box sx={{ width: widtherer }}>
                <Card className="cardShadower">
                    <Box className="box-card-header" sx={{}}>
                        <Typography variant="h6" sx={{padding: '.5em', display: 'flex', justifyContent:'center'}}>Register</Typography>
                    </Box>
                    <CardContent sx={{display:'flex', justifyContent:'center'}}>
                        <Box id="rgtsvrsdvt" sx={{width: '90%', display:'flex', flexDirection:'column'}}>

                            <OneInput id="register-nom" label="Nom" value={values.nameRegister} fct={handleChange('nameRegister')} error={errors.nameRegister.error} required={true} blur={checker('name')} sizeFont={sizeFont}/>
                            {errors.nameRegister.error && 
                                <Typography variant="p" sx={{color:'#d32f2f', backgroundColor: '#e5737326',padding: '.5em', border: '1px solid #d32f2f', borderRadius: '5px'}}>
                                    {errors.nameRegister.message}
                                </Typography>
                            }

                            <OneInput id="register-email" label="Email" value={values.emailRegister} fct={handleChange('emailRegister')} error={errors.emailRegister.error} required={true} blur={checker('emailRegister')} sizeFont={sizeFont}/>
                            {errors.emailRegister.error && 
                                <Typography variant="p" sx={{color:'#d32f2f', backgroundColor: '#e5737326',padding: '.5em', border: '1px solid #d32f2f', borderRadius: '5px'}}>
                                    {errors.emailRegister.message}
                                </Typography>
                            }

                            <OneFormControl 
                                id="register-num_tel" 
                                label="N° tel" 
                                value={values.num_tel} 
                                fct={handleChange('num_tel')} 
                                error={false}
                                adornmentStart={<InputAdornment position="start">+ 033</InputAdornment>}
                                sizeFont={sizeFont}
                            />
                            {errors.num_tel.error && 
                                <Typography variant="p" sx={{color:'#d32f2f', backgroundColor: '#e5737326',padding: '.5em', border: '1px solid #d32f2f', borderRadius: '5px'}}>
                                    {errors.num_tel.message}
                                </Typography>
                            }



                            <FormControl 
                                sx={{
                                    my:2,
                                    '& .MuiInputLabel-root': {color:'#00B899', fontSize: sizeFont},
                                    '& .MuiInput-input': {color:'#00B899', fontSize: sizeFont},
                                    '& .MuiInput-root': {color:'#00B899', fontSize: sizeFont},
                                }}  
                                variant="standard"
                            >
                                <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.passwordRegister}
                                    onChange={handleChange('passwordRegister')}
                                    onBlur={()=> checker("pass")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff sx={{ color: '#00B899' }} /> : <Visibility sx={{ color: '#00B899' }}/>}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    error={errors.passwords.error}
                                />
                            </FormControl>
                            {errors.passwords.error && 
                                <Typography variant="p" sx={{color:'#d32f2f', backgroundColor: '#e5737326',padding: '.5em', border: '1px solid #d32f2f', borderRadius: '5px'}}>
                                    {errors.passwords.message}
                                </Typography>
                            }

                            <FormControl 
                                sx={{
                                    my:2,
                                    '& .MuiInputLabel-root': {color:'#00B899', fontSize: sizeFont},
                                    '& .MuiInput-input': {color:'#00B899', fontSize: sizeFont},
                                    '& .MuiInput-root': {color:'#00B899', fontSize: sizeFont},
                                }}  
                                variant="standard"
                            >
                                <InputLabel htmlFor="standard-adornment-passwordConfirm">Vérif du mot de passe</InputLabel>
                                <Input
                                    id="standard-adornment-passwordConfirm"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.passwordRegisterConfirm}
                                    onChange={handleChange('passwordRegisterConfirm')}
                                    onBlur={()=> checker("pass")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff sx={{ color: '#00B899' }} /> : <Visibility sx={{ color: '#00B899' }}/>}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    error={errors.passwords.error}
                                />
                            </FormControl>
                            {errors.passwords.error && 
                                <Typography variant="p" sx={{color:'#d32f2f', backgroundColor: '#e5737326',padding: '.5em', border: '1px solid #d32f2f', borderRadius: '5px'}}>
                                    {errors.passwords.message}
                                </Typography>
                            }
                            
                        </Box>
                    </CardContent>
                    <CardActions sx={{justifyContent:centerer, m:2}}>
                        <Button 
                            className="btnValid"
                            onClick={() => {handleSubmitRegister(); }}
                            variant="outlined"
                        >
                            Enregistrement
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}
