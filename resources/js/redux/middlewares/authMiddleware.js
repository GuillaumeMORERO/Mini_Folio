import axios from 'axios';

import {setSuccess, setError, loggedOutUser, writeUserData } from '../actions/userActions';
import {setFilmList, setFilmDetail, setLoadingFilm} from '../actions/filmsActions';
import {setBookList, setBookDetail, setLoadingBook} from '../actions/booksActions';
import {setNewsList, setNewsDetail, setLoadingNews} from '../actions/newsActions';
import {setJvList, setJvDetail, setLoadingJv} from '../actions/jvActions';

const authMiddleware = store => next => action => {

    let isUser = false;
    let accessToken = '';

    //pour themoviedb.org
    const apiKeyMovie = 'eedec9759e40dc1a34fabf5c32a10044';
    // const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWRlYzk3NTllNDBkYzFhMzRmYWJmNWMzMmExMDA0NCIsInN1YiI6IjYxNWMyODVjYmIxMDU3MDA0NDM1Y2UxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1lWHoFyiZ8ZXQc6CktQmUErulq-sGHCxlvgM3t5aRQM';

    // pour google books api
    const apiKeyBook = 'AIzaSyCfD2ocxbpUIZXz34bUyaaY3mnJhSynDUU';

    // npm run watch set 'developpement', npm run production set 'production'
    const APIURL = (process.env.NODE_ENV == 'production') ? 'http://apireact.guimor.fr/api' : "http://minifolio.test/api";
    
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const accessTokenLocalStorage = JSON.parse(localStorage.getItem('access_token'));
    if(localStorage.length > 0) {
        isUser = true;
        accessToken = accessTokenLocalStorage
    }

    const apiClient = axios.create({
        baseURL: APIURL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    });

    switch (action.type) {
        case 'LOGIN_USER': {
            if (!isUser) {
                axios.get('/sanctum/csrf-cookie').then(() => {
                    apiClient.post('/login', {
                        email: action.data.email,
                        password: action.data.password
                    }).then(response => {
                        // console.log('middleware login response = ', response);
                        if(response.data.status == 'error') {
                            store.dispatch(setError({title: 'Echec de la connexion', message: response.data.messages, cat: 'loginError'}));
                        }
                        if(response.data.status == 'success') {
                            store.dispatch(writeUserData(response.data.userData));
                            localStorage.setItem('user', JSON.stringify(response.data.userData));
                            localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
                            store.dispatch(setSuccess({title: 'Connexion réussie', message: `Bonjour ${response.data.userData.name} !`, cat: 'loginSuccess'}));
                        }
                    }).catch(erreur => {
                        // console.log('middleware login erreur = ', erreur);
                        store.dispatch(setError({title: 'Echec de la connexion', message: erreur.response.data.message, cat: 'loginError'}));
                    });
                });
            }
            break;
        }

        case 'LOGOUT_USER':
            if(isUser) {
                axios.get('/sanctum/csrf-cookie').then(() => {
                    apiClient.post('/logout',
                    ).then(response => {
                        // console.log('middleware logout response = ', response)
                        store.dispatch(setSuccess({title: 'Déconnexion', message: `A bientôt ${userLocalStorage.name} !`, cat: 'logoutSuccess'}));
                        store.dispatch(loggedOutUser());
                        localStorage.clear();
                    }).catch(erreur => {
                        // console.log('middleware logout erreur = ', erreur.response);
                        store.dispatch(setError({title: 'Echec de la déconnexion', message: 'ya une erreur', cat: 'logoutError'}));
                    });
                });
            }
        break;

        case 'REGISTER_USER':
            axios.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post('/register', {
                    name: action.data.name,
                    email: action.data.email,
                    password: action.data.password,
                    num_tel: action.data.num_tel,
                }).then(response => {
                    // console.log('middleware register response = ', response)
                    if(response.data.status == 'error') {
                        store.dispatch(setError({title: 'Echec de l\' enregistrement', message: response.data.messages, cat: 'registerError'}));
                    }
                    if(response.data.status == 'success') {
                        store.dispatch(writeUserData(response.data.userData));
                        localStorage.setItem('user', JSON.stringify(response.data.userData));
                        localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
                        store.dispatch(setSuccess({title: 'Enregistrement réussi', message: `Bonjour ${response.data.userData.name} !`, cat: 'registerSuccess'}));
                    }
                }).catch(erreur => {
                    // console.log('middleware register erreur = ', erreur.response);
                    // console.log('middleware register erreur = ', erreur);
                    store.dispatch(setError({title: 'Echec de l\' enregistrement', message: 'ya une erreur', cat: 'registerError'}));
                });
            });
        break;

        case 'POST_USER_DATA':
            axios.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post('/postUserData', {
                    name: action.data.name,
                    email: action.data.email,
                    num_tel: action.data.num_tel
                })
                .then(response => {
                    // console.log('middleware postUserData response = ', response);
                    store.dispatch(writeUserData(response.data.userData));
                    localStorage.setItem('user', JSON.stringify(response.data.userData));
                    store.dispatch(setSuccess({title: 'Mise à jour de vos données réussie', message: `Merci ${response.data.userData.name} !`, cat: 'updateSuccess'}));
                })
                .catch(error => {
                    console.log('middleware postUserData error = ', error.response);
                });
            });
        break;
    
        case 'REQUEST_FILM_LIST': {
            // console.log('case REQUEST_FILM_LIST = ', action)
            store.dispatch(setLoadingFilm(true));
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyMovie}&query=${action.query.title}&page=${action.query.page}`) // recherche globlae
            // 
            .then(response => {
                // console.log('response REQUEST_FILM_LIST = ', response.data);
                if(response.data.total_results == 0) {
                    store.dispatch(setLoadingFilm(false));
                    store.dispatch(setError({title: 'Résultats', message: 'Votre recherche n\'a donné aucun résultat...', cat: 'filmError'}));
                }else{
                    store.dispatch(setFilmList(response.data, action.query.page, action.query.title));
                }
            })
            .catch(error => console.error('error REQUEST_FILM_LIST = ', error));
            break;
        }

        case 'REQUEST_FILM_DETAIL': {
            // console.log('case REQUEST_FILM_DETAIL = ', action)
            store.dispatch(setLoadingFilm(true));
            axios.get(`https://api.themoviedb.org/3/movie/${action.filmID}?api_key=${apiKeyMovie}`) // recherche les detail d'un film
            // 
            .then(response => {
                // console.log('response REQUEST_FILM_DETAIL = ', response.data);
                store.dispatch(setFilmDetail(response.data));
            })
            .catch(error => console.error('error REQUEST_FILM_DETAIL = ', error));
            break;
        }

        case 'REQUEST_BOOK_LIST': {
            // console.log('case REQUEST_BOOK_LIST = ', action)
            store.dispatch(setLoadingBook(true));
            let auteur = action.query.author;
            let titre = action.query.title;
            let booQuery = '';
            if (auteur == ''){booQuery = `intitle:${titre}`;}
            else if (titre == ''){booQuery = `inauthor:${auteur}`;}
            else {booQuery = `inauthor:${auteur}+intitle:${titre}`;}
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${booQuery}&maxResults=20&startIndex=${action.query.page}&key=${apiKeyBook}`) // recherche globale
            .then(response => {
                // console.log('response REQUEST_BOOK_LIST = ', response.data);
                if (response.data.totalItems == 0) {
                    store.dispatch(setLoadingBook(false));
                    store.dispatch(setError({title: 'Résultats', message: 'Votre recherche n\'a donné aucun résultat...', cat: 'bookError'}));
                }else{
                    store.dispatch(setBookList(response.data, action.query.page, action.query.title, action.query.author));
                }
            })
            .catch(error => console.error('error REQUEST_BOOK_LIST = ', error));
            break;
        }
        case 'REQUEST_BOOK_DETAIL': {
            // console.log('case REQUEST_BOOK_DETAIL = ', action)
            store.dispatch(setLoadingBook(true));
            axios.get(`https://www.googleapis.com/books/v1/volumes/${action.bookID}?key=${apiKeyBook}`) // recherche les detail d'un livre
            // 
            .then(response => {
                // console.log('response REQUEST_BOOK_DETAIL = ', response.data);
                store.dispatch(setBookDetail(response.data));
            })
            .catch(error => console.error('error REQUEST_BOOK_DETAIL = ', error));
            break;
        }

        case 'REQUEST_NEWS_LIST': {
            // console.log('case REQUEST_NEWS_LIST = ', action)
            store.dispatch(setLoadingNews(true));
            axios.get('/sanctum/csrf-cookie').then(() => {
                apiClient.get('/getApiDataNews')
                .then(response => { 
                    // console.log('response REQUEST_NEWS_LIST = ', response.data);
                    if(response.data.status == 'error') {
                        store.dispatch(setLoadingNews(false));
                        store.dispatch(setError({title: 'Erreur', message: response.data.message, cat: 'newsError'}));
                    }
                    else{
                        store.dispatch(setNewsList(response.data.arrayData));
                    }
                })
                .catch(error => console.error('error REQUEST_NEWS_LIST = ', error));
            });
            break;
        }

        case 'REQUEST_JV_LIST': {
            // console.log('case REQUEST_JV_LIST = ', action)
            store.dispatch(setLoadingJv(true));
            axios.get('/sanctum/csrf-cookie').then(() => {
                apiClient.get('/getApiDataJv')
                .then(response => { 
                    console.log('response REQUEST_JV_LIST = ', response.data);
                    // if(response.data.status == 'error') {
                    //     store.dispatch(setLoadingJv(false));
                    //     store.dispatch(setError({title: 'Erreur', message: response.data.message, cat: 'jvError'}));
                    // }
                    // else{
                    //     store.dispatch(setJvList(response.data.arrayJv));
                    // }
                })
                .catch(error => console.error('error REQUEST_JV_LIST = ', error));
            });
            break;
        }

        default:
            break;
    }

    return next(action)
};

export default authMiddleware