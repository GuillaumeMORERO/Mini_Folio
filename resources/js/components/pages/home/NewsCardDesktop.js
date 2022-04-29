import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function newCardDesktop({news, index, imager, timer, goToNews}) {

    return (
        <Card key={index} sx={{}} className="cardShadower" sx={{mb:1, width:'340px'}} onClick={()=> goToNews(news.url)}>
            <Box sx={{m:1}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imager(news.urlToImage)}
                    alt="cover news"
                    sx={{borderRadius:'5px'}}
                />
            </Box>
            <CardContent sx={{height:'-webkit-fill-available', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <Typography component="div" sx={{color:'#00B899', mb:2}}>
                    {news.title}
                </Typography>
                <Box sx={{display:'flex', justifyContent:'space-between' ,paddingTop:'1em'}}>
                    <Typography  sx={{fontStyle: 'italic', fontSize:'.6em', color:'#00B899'}}>
                        {news.source.name}
                    </Typography>
                    <Typography  sx={{fontStyle: 'italic', fontSize:'.6em', color:'#00B899'}}>
                        Il y a {timer(news.publishedAt)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}