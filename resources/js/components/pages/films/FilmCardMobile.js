import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export default function filmCardMobile({film, index, urlIMG, dateSortie, rater, truncate, displayDetails}) {

    return (
        <Card key={index} className="cardShadower" sx={{mb:'1em'}} onClick={()=> displayDetails(film.id)}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{width:'25%'}}>
                    <CardMedia
                        component="img"
                        image={urlIMG(film.poster_path)}
                        alt="backdrop_path"
                        // sx={{maxWidth: '50%', width:'25%' }}
                    />
                </Box>
                <Box sx={{margin: '1em', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Typography variant="h5">{film.original_title}</Typography>
                    <Box sx={{display: 'flex', alignItems:'baseline'}}>
                        <Typography sx={{fontStyle: 'italic', fontSize:'.6em', mr:2}}>Date de sortie : </Typography>
                        <Typography sx={{fontSize:'.8em'}}>{dateSortie(film.release_date)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems:'center'}}>
                        <Rating name="half-rating-read" value={rater(film.vote_average)} precision={0.1} size="small" />
                        <Typography sx={{fontStyle: 'italic', fontSize:'.6em', ml:1}}>/ {film.vote_count} votes</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{fontStyle: 'italic', fontSize:'.8em', margin: '1em'}}>" {truncate(film.overview)} "</Typography>
        </Card>
    )
}
