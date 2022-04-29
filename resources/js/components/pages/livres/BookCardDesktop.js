import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function filmsLister({book, index, displayDetailsBook, authorName, truncateBookTxt}) {

    const IMGURL = () => {
        return  book.volumeInfo.imageLinks != undefined ? book.volumeInfo.imageLinks.thumbnail : '/';
    }

    return (
        <Card key={index} className="cardShadower" sx={{display:'flex', flexDirection:'row', width:'45%', my:2}} onClick={()=> displayDetailsBook(book.id)}>
            <Box sx={{margin: '.5em'}}>
                <CardMedia
                    component="img"
                    image={IMGURL()}
                    alt="backdrop_path"
                    sx={{height:140, width:'initial' }}
                />
            </Box>
            <Box sx={{margin: '1em', height: 'fit-content'}}>
                <Typography variant="h5">{book.volumeInfo.title}</Typography>
                <Box sx={{display: 'flex', alignItems:'baseline'}}>
                    <Typography sx={{fontStyle: 'italic', fontSize:'.6em', mr:2}}>Date de sortie : </Typography>
                    <Typography sx={{fontSize:'.8em'}}>{book.volumeInfo.publishedDate}</Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems:'center'}}>
                    <Typography sx={{fontStyle: 'italic', fontSize:'.6em'}}>{authorName(book.volumeInfo.authors)}</Typography>
                </Box>
                <Typography sx={{fontStyle: 'italic', fontSize:'.8em'}}>" {truncateBookTxt(book.volumeInfo.description)} "</Typography>
            </Box>
        </Card>
    )
}
