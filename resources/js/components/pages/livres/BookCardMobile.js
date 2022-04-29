import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function bookCardMobile({book, index, displayDetailsBook, authorName, truncateBookTxt}) {

    const IMGURL = () => {
        return  book.volumeInfo.imageLinks != undefined ? book.volumeInfo.imageLinks.thumbnail : '/';
    }

    return (
        <Card key={index} className="cardShadower" sx={{mb:'1em'}} onClick={()=> displayDetailsBook(book.id)}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{width:'25%'}}>
                    <CardMedia
                        component="img"
                        image={IMGURL()}
                        alt="backdrop_path"
                    />
                </Box>
                <Box sx={{margin: '1em', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Typography variant="h5">{book.volumeInfo.title}</Typography>
                    <Box sx={{display: 'flex', alignItems:'baseline'}}>
                        <Typography sx={{fontStyle: 'italic', fontSize:'.6em', mr:2}}>Date de sortie : </Typography>
                        <Typography sx={{fontSize:'.8em'}}>{book.volumeInfo.publishedDate}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems:'center'}}>
                        <Typography sx={{fontStyle: 'italic', fontSize:'.6em'}}>{authorName(book.volumeInfo.authors)}</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{fontStyle: 'italic', fontSize:'.8em', margin: '1em'}}>" {truncateBookTxt(book.volumeInfo.description)} "</Typography>
        </Card>
    )
}