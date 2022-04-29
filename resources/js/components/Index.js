import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector, Provider, useDispatch } from 'react-redux'

import store from '../redux/store'
import { writeUserData } from '../redux/actions/userActions';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './style.scss';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Films from './pages/films/Films';
import Livres from './pages/livres/Books';
import Links from './pages/Links';
import JV from './pages/JV';
import Home from './pages/home/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './layout/NavBar';
import AuthRoute from './AuthRoute';

import Modaler from './Modaler';


export default function App() {
    const dispatch = useDispatch();

    const {loggedin} = useSelector(state => state.userReducer);

    function isMobile() {
        const mql = window.matchMedia('(max-width: 768px)');
        return mql.matches;
    }

    React.useEffect(() => {
        // ce useEffect est la juste pour check si le localStorage est rempli, auquel cas on reco le user
        if (localStorage.length > 0) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(writeUserData({
                name: user.name,
                email: user.email,
                num_tel: user.num_tel,
                isMobile: isMobile()
            }));
        }
    }, []);

    return (
        <div id="racine">
            <Router>
                <Header isMobile={isMobile} />
                <Modaler/>
                <div id="main-container">
                    <Switch>
                        {/* 
                            Routes publiques
                        */}
                        <Route exact path="/"> <Home isMobile={isMobile()}/> </Route>
                        <Route exact path="/login"> <Login isMobile={isMobile()}/> </Route>
                        <Route exact path="/register"> <Register isMobile={isMobile()}/> </Route>
                        <Route path="/liens"> <Links isMobile={isMobile()}/> </Route>
                        {/* 
                            Routes protégées, renvoie un lien vers login si pas auth 
                        */}
                        <AuthRoute path="/profile" isLogged={loggedin}> <Profile  isMobile={isMobile()}/> </AuthRoute>
                        <AuthRoute path="/livres" isLogged={loggedin}> <Livres  isMobile={isMobile()}/> </AuthRoute>
                        <AuthRoute path="/jv" isLogged={loggedin}> <JV  isMobile={isMobile()}/> </AuthRoute>
                        <AuthRoute path="/films" isLogged={loggedin}> <Films  isMobile={isMobile()}/> </AuthRoute>

                    </Switch>
                </div>
                <NavBar isMobile={isMobile()}/>
            </Router>
        </div>
    );
}

const rootElement = document.getElementById('reactRoot')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
