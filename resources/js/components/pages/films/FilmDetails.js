import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {modalFilmDetail} from '../../../redux/actions/filmsActions';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Modal from '@mui/material/Modal';

export default function filmDetails({widtherer}) {

    const {isModalFilmOpen, filmDetail} = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(modalFilmDetail(false))
    }

    function genreDisplayer(genres){
        let genresString = '';
        if (genres != undefined) {
            genres.map(elm => genresString = genresString + elm.name+', ' )
        }
        return `Genre(s) : ${genresString.slice(0, -2)}`
    }
    function companiesDisplayer(companies){
        let companiesString = '';
        if (companies != undefined) {
            companies.map(elm => companiesString = companiesString + elm.name+', ' )
        }
        return `Production : ${companiesString.slice(0, -2)}`
    }

    return (
        <Modal
            sx={{overflow:'scroll'}}
            onClick={handleClose}
            open={isModalFilmOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modalStyleFilmDetail' sx={{width: widtherer}}>
                <Paper sx={{
                    width: '100%',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w300${filmDetail.backdrop_path})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {filmDetail.original_title}
                    </Typography>
                    <Typography >
                        {genreDisplayer(filmDetail.genres)}
                    </Typography>
                    <Typography >
                        {filmDetail.budget}
                    </Typography> 
                    <Typography >
                        {filmDetail.revenue}
                    </Typography>                      
                    <Typography >
                        {filmDetail.homepage}
                    </Typography>
                    <Typography >
                        {filmDetail.imdb_id}
                    </Typography>
                    <Typography >
                        {companiesDisplayer(filmDetail.production_companies)}
                    </Typography>
                </Paper>
            </Box>
        </Modal>
    )
}