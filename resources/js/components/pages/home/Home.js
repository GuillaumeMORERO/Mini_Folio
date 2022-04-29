import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {requestNewsList} from '../../../redux/actions/newsActions';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import NewsLister from './NewsLister';
import Spinner from '../../reuser/Spinner';

export default function homeComponent({isMobile}) {

    const dataNews = useSelector(state => state.newsReducer);
    // const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    useEffect(()=>{
        if(Object.keys(dataNews.news).length == 0) {
            dispatch(requestNewsList());
        }
    },[]);

    const shower = () => {
        if(Object.keys(dataNews.news).length > 0) {
            return (
                <Box className="itemLister" sx={{my:3}}>
                    <NewsLister  dataNews={dataNews} isMobile={isMobile}/>
                </Box>
            )
        }else {
            return (
                <Box className="cardShadower" sx={{textAlign:'center', my:'2em', padding:'1em', borderRadius:'5px', backgroundColor:'#000000e4'}}>
                    <Typography>Aucun résultat</Typography>
                </Box>
            )
        }
    }

    return (
        <div className="marger">
            <Box sx={{ width: widtherer}}>
                <Box className="cardShadower" sx={{textAlign:'center', mb:'2em', padding:'1em', borderRadius:'5px', backgroundColor:'#000000e4'}}>
                    <Typography sx={{width: '-webkit-fill-available', textAlign:'center'}}>
                        Ce site doit être vu comme un "cas d'école", une sorte
                    </Typography>
                </Box>
                {dataNews.loading ? <Spinner/> : <>{shower()}</> }
            </Box>
        </div>
    )
}