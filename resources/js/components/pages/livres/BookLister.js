import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {requestBookDetail} from '../../../redux/actions/booksActions';

import BookDetails from './BookDetails';
import BookCardDesktop from './BookCardDesktop';
import BookCardMobile from './BookCardMobile';

export default function booksLister({dataBooks, isMobile}) {

    const dispatch = useDispatch();
    const widtherer = isMobile ? '95%' : '50%';

    function displayDetailsBook(bookId) {
        dispatch(requestBookDetail(bookId))
    } 
    const authorName = (arrayName) => {
        let names = '';
        if (arrayName != undefined) {
            arrayName.map(name => names = names+name+', ');
        }else{
            names = 'Aucun auteur trouvé, ';
        }
        return names.slice(0, -2);
    }
    function truncateBookTxt(strBook){
        if (strBook != undefined) {
            return (strBook.length > 250) ? `${strBook.substring(0, 250)} ... [plus]` : strBook;
        }else {
            return 'Description indisponible'
        }
    };

    const lister = () => {
        if(isMobile) {
            return(
                dataBooks.books.map((book, index) => 
                    <BookCardMobile key={index} book={book} index={index} authorName={authorName} truncateBookTxt={truncateBookTxt} displayDetailsBook={displayDetailsBook} />
                )
            )
        }
        else {
            return (
                dataBooks.books.map((book, index) => 
                    <BookCardDesktop key={index} book={book} index={index} authorName={authorName} truncateBookTxt={truncateBookTxt} displayDetailsBook={displayDetailsBook} />
                )
            )
        }
    }

    const {isModalBookOpen} = useSelector(state => state.booksReducer);
    const detailer = () => {
        if (isModalBookOpen) {
            return (<BookDetails widtherer={widtherer}/>)
        }
    }

    return (
        <>
            {lister()}
            {detailer()}
        </>
    )

}