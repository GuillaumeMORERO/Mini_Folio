import React from 'react';
import { useDispatch } from 'react-redux';

import {requestFilmDetail} from '../../../redux/actions/filmsActions';

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import FilmDetails from './FilmDetails';
import FilmCardDesktop from './FilmCardDesktop';
import FilmCardMobile from './FilmCardMobile';

export default function filmsLister({dataFilms, isMobile}) {

    const dispatch = useDispatch();
    const widtherer = isMobile ? '95%' : '50%';

    const urlIMG = (slug) => {
        return `https://image.tmdb.org/t/p/w300${slug}`;
    };
    const dateSortie = (dateBrute) => {
        const d = new Date(dateBrute)
        const year = d.getFullYear() // année
        const date = d.getDate() // jour
        const monthIndex = d.getMonth()+1 // mois
        let month = monthIndex == 1 ? 'Janvier' : monthIndex == 2 ? 'Février': monthIndex == 3 ? 'Mars': monthIndex == 4 ? 'Avril' : monthIndex == 5 ? 'Mai' : monthIndex == 6 ? 'Juin' : monthIndex == 7 ? 'Juillet' : monthIndex == 8 ? 'Août': monthIndex == 9 ? 'Septembre' : monthIndex == 10 ? 'Octobre' : monthIndex == 11 ? 'Novembre' : monthIndex == 12 ? 'Décembre' : 'indéfini';      
        return `le ${date} ${month} ${year}`
    };
    const rater = (rate) => {
        return parseFloat((rate/2).toFixed(1));
    };
    function truncate(str){
        if (str != undefined) {
            return (str.length > 250) ? `${str.substr(0, 250)} ... [plus]` : str;
        }else {
            return 'Description indisponible'
        }
    };
    function displayDetails(filmId) {
        dispatch(requestFilmDetail(filmId))
    } 

    const lister = () => {
        if(isMobile) {
            return(
                dataFilms.films.map((film, index) => 
                    <FilmCardMobile key={index} film={film} index={index} urlIMG={urlIMG} dateSortie={dateSortie} rater={rater} truncate={truncate} displayDetails={displayDetails}/>
                )
            )
        }
        else {
            return (
                dataFilms.films.map((film, index) => 
                    <FilmCardDesktop key={index} film={film} index={index} urlIMG={urlIMG} dateSortie={dateSortie} rater={rater} truncate={truncate} displayDetails={displayDetails}/>
                )
            )
        }
    }
    return (
        <>
            {lister()}
            <FilmDetails widtherer={widtherer}/>
        </>
    )


}