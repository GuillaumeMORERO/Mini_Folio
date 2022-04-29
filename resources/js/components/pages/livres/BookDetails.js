import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {modalBookDetail} from '../../../redux/actions/booksActions';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Modal from '@mui/material/Modal';

export default function bookDetails({widtherer}) {
    
    const {isModalBookOpen, bookDetail} = useSelector(state => state.booksReducer);

    const dispatch = useDispatch();
    function handleClose() {
        dispatch(modalBookDetail(false))
    }
    const IMGURL = () => {
        return  bookDetail.volumeInfo.imageLinks != undefined ? bookDetail.volumeInfo.imageLinks.thumbnail : '/';
    }
    return (
        <Modal
            sx={{overflow:'scroll'}}
            onClick={handleClose}
            open={isModalBookOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className='modalStyleFilmDetail' sx={{width: widtherer}}>
                <Paper sx={{
                    width: '100%',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${IMGURL()})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {bookDetail.volumeInfo.title}
                    </Typography>
                    <Typography >
                        {bookDetail.volumeInfo.categories}
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: bookDetail.volumeInfo.description }} />
                </Paper>
            </Box>
        </Modal>
    )
}