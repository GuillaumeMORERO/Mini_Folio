import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {requestFilmList, setQueryFilm} from '../../../redux/actions/filmsActions';
import {setError} from '../../../redux/actions/userActions';

import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import OneInput from '../../reuser/OneInput';
import FilmsLister from './FilmsLister';
import Spinner from '../../reuser/Spinner';

export default function filmsComponent({isMobile}) {
    
    // const user = useSelector(state => state.userReducer);
    const dataFilms = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const centerer = isMobile ? 'center' : 'flex-end';
    const sizeFont = isMobile ? '.8em' : '1em';
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    const handleChange = prop => queryTyped => {
        dispatch(setQueryFilm({title:queryTyped, page:1}));
    };

    const handleSubmit = () => {
        if(dataFilms.query != '') {
            dispatch(requestFilmList(dataFilms.query));
        }
        else {
            dispatch(setError({title: 'Erreur !', message: "Vous devez renseigner le champ 'Recherche'", cat: 'filmError'}));
        }
    }

    const paginate = (event, pageFilm)=> {
        dispatch(requestFilmList({title:dataFilms.query.title, page:pageFilm}));
        window.scrollTo(0, 0)
    }

    const shower = () => {
        if(dataFilms.total_results > 0) {
            return (
                <>
                    <Box className="cardShadower" sx={{textAlign:'center', my:'2em', padding:'1em', borderRadius:'5px', backgroundColor:'#000000e4'}}>
                        <Typography sx={{mb:1}}>{dataFilms.total_results} films trouvés</Typography>
                        <Stack spacing={2} sx={{display: 'flex', alignItems: 'center' }}>
                            <Pagination count={dataFilms.total_pages} shape="rounded" showFirstButton showLastButton onChange={paginate} sx={{border: '1px solid #00B899', borderRadius:'5px'}}/>
                        </Stack>
                        <Typography sx={{fontStyle: 'italic', fontSize:'.8em', mt:1}}>page : {dataFilms.query.page} / {dataFilms.total_pages}</Typography>
                    </Box>
                    <Box className="itemLister" sx={{my:3}}>
                        <FilmsLister  dataFilms={dataFilms} isMobile={isMobile}/>
                    </Box>
                    <Stack spacing={2} sx={{display: 'flex', alignItems: 'center' }}>
                        <Pagination count={dataFilms.total_pages} shape="rounded" showFirstButton showLastButton onChange={paginate} sx={{border: '1px solid #00B899', borderRadius:'5px'}}/>
                    </Stack>
                </>
            )
        }
        else {
            return (
                <Box className="cardShadower" sx={{textAlign:'center', my:'2em', padding:'1em', borderRadius:'5px', backgroundColor:'#000000e4'}}>
                    <Typography>Aucun résultat</Typography>
                </Box>
            )
        }
    }

    return (
        <Box className='marger'>
            <Box sx={{ width: widtherer}}>
                <Card className="cardShadower">
                    <Box className="box-card-header" sx={{}}>
                        <Typography sx={{my:'1em'}}>FILMS</Typography> 
                    </Box>
                    <CardActions sx={{flexDirection:'column', justifyContent:centerer, my:1}}>
                        <Typography sx={{}}>Saisissz vos critères de recherche : </Typography> 
                        <Box sx={{width: '80%'}}>
                            <OneInput id="film-query" label="Recherche" value={dataFilms.query.title} fct={handleChange('queryFilm')} sizeFont={sizeFont}/>
                        </Box>
                        <Button 
                            className="btnValid"
                            onClick={() => {handleSubmit()}}
                            variant="outlined"
                        >
                            Rechercher
                        </Button>
                    </CardActions>
                </Card>
                {dataFilms.loading ? <Spinner/> : <>{shower()}</> }
            </Box>
        </Box>
    )
}
