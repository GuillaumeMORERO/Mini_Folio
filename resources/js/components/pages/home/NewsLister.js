import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NewsCardDesktop from './NewsCardDesktop';

export default function newsLister({dataNews}) {

    function imager(link){
        return link == null ? 'images/modernAPI.jpg' : link;
    };

    function timer(newsPublishedDate){
        let newsMiliSec = new Date(newsPublishedDate).getTime();
        let nowMiliSec = new Date().getTime();
        let ms = nowMiliSec - newsMiliSec;

        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;

        if (hours > 670){ // + d'un mois (calcul grossier...)
            return `${Math.ceil(hours/670)} mois`;
        }
        else if(hours > 168){ // + d'une semaine
            return `${Math.ceil(hours/168)} semaines`;
        }
        else if(hours > 24){ // + d'un jour
            return `${Math.ceil(hours/24)} jours`;
        }
        else {
            return `${hours} heure(s)`
            // return 'moins d\'une journée'
        }
    }

    function goToNews(url){
        window.location = url;
    }

    return (
        <>
            {
                dataNews.news.map((news, index) => 
                    <NewsCardDesktop key={index} news={news} index={index} imager={imager} timer={timer} goToNews={goToNews} />
                )
            }
        </>
    )
}