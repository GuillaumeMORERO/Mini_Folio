import React, {useState,useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {requestBookList, setQueryBook} from '../../../redux/actions/booksActions';
import {setError} from '../../../redux/actions/userActions';

import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import OneInput from '../../reuser/OneInput';
import BooksLister from './BookLister';
import Spinner from '../../reuser/Spinner';

export default function livresComponent({isMobile}) {
    
    const user = useSelector(state => state.userReducer);
    const dataBooks = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();
    const [stateBookSearch, setStateBookSearch] = useState({author: '', title: '', page: 1});

    const centerer = isMobile ? 'center' : 'flex-end';
    const sizeFont = isMobile ? '.8em' : '1em';
    const widtherer = isMobile ? '-webkit-fill-available' : '75%';

    const handleChange = prop => queryTyped => {
        setStateBookSearch({...stateBookSearch, [prop]:queryTyped});
    };
    useEffect(() => {
        setStateBookSearch({title: dataBooks.query.title, author: dataBooks.query.author, page:dataBooks.query.page})
    }, [])

    const handleSubmit = () => {
        if((stateBookSearch.author == '') && (stateBookSearch.title == '') ){
            dispatch(setError({title: 'Erreur !', message: "Vous devez renseigner au moins un champ !", cat: 'bookError'}));
        }
        else {
            dispatch(requestBookList({title: stateBookSearch.title, author: stateBookSearch.author, page:1}));
        }
    }

    const paginate = (event, pageBook)=> {
        dispatch(requestBookList({title: dataBooks.query.title, author: dataBooks.query.author, page:pageBook}));
        window.scrollTo(0, 0)
    }

    const shower = () => {
        if(Object.keys(dataBooks.books).length > 0) {
            return (
                <>
                    <Box className="cardShadower" sx={{textAlign:'center', my:'2em', padding:'1em', borderRadius:'5px', backgroundColor:'#000000e4'}}>
                        <Typography sx={{mb:1}}>{dataBooks.total_results} livres trouvés</Typography>
                        <Stack spacing={2} sx={{display: 'flex', alignItems: 'center' }}>
                            <Pagination count={dataBooks.total_pages} shape="rounded" showFirstButton showLastButton onChange={paginate} sx={{border: '1px solid #00B899', borderRadius:'5px'}}/>
                        </Stack>
                        <Typography sx={{fontStyle: 'italic', fontSize:'.8em', mt:1}}>page : {dataBooks.query.page} / {dataBooks.total_pages}</Typography>
                    </Box>
                    <Box className="itemLister" sx={{my:3}}>
                        <BooksLister  dataBooks={dataBooks} isMobile={isMobile}/>
                    </Box>
                    <Stack spacing={2} sx={{display: 'flex', alignItems: 'center' }}>
                        <Pagination count={dataBooks.total_pages} shape="rounded" showFirstButton showLastButton onChange={paginate} sx={{border: '1px solid #00B899', borderRadius:'5px'}}/>
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
                        <Typography sx={{my:'1em'}}>LIVRES</Typography> 
                    </Box>
                    <CardActions sx={{flexDirection:'column', justifyContent:centerer, my:1}}>
                        <Typography sx={{}}>Saisissz vos critères de recherche : </Typography> 
                        <Box sx={{width: '80%'}}>
                            <OneInput id="bookAuthor-query" label="Auteur" value={dataBooks.query.author} fct={handleChange('author')} sizeFont={sizeFont}/>
                            <OneInput id="bookTitle-query" label="Titre" value={dataBooks.query.title} fct={handleChange('title')} sizeFont={sizeFont}/>
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
                {dataBooks.loading ? <Spinner/> : <>{shower()}</> }
            </Box>
        </Box>
    )
}



