import axios from 'axios';

import {setSuccess, setError, loggedOutUser, writeUserData} from '../actions/userActions';

const apiRequestMiddleware = store => next => action => {
// console.log('apiRequestMiddleware = ',action)


    const apiKeyMovie = 'eedec9759e40dc1a34fabf5c32a10044';
    // const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWRlYzk3NTllNDBkYzFhMzRmYWJmNWMzMmExMDA0NCIsInN1YiI6IjYxNWMyODVjYmIxMDU3MDA0NDM1Y2UxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1lWHoFyiZ8ZXQc6CktQmUErulq-sGHCxlvgM3t5aRQM';

    switch (action.type) {
        case 'REQUEST_FILM_LIST': {
            console.log('apiMiddle = ', action.type)
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyMovie}&query=${action.query}&page=1`) // recherche globlae
            // 
            .then(response => {
                console.log('response REQUEST_FILM_LIST = ', response.data);
            })
            .catch(error => console.error('error REQUEST_FILM_LIST = ', error));
            break;
        }

        case 'REQUEST_FILM_DETAIL': {
            console.log('apiMiddle = ', action.type)
            axios.get(`https://api.themoviedb.org/3/movie/${action.data.filmID}?api_key=${apiKeyMovie}`) // recherche les detail d'un film
            // 
            .then(response => {
                console.log('response REQUEST_FILM_DETAIL = ', response.data);
            })
            .catch(error => console.error('error REQUEST_FILM_DETAIL = ', error));
            break;
        }

        default:
            break;
    }


}
export default apiRequestMiddleware