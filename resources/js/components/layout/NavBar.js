import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import LinkIcon from '@mui/icons-material/Link';

export default function navBar({isMobile}) {

    const user = useSelector(state => state.userReducer);
    const navStyle = isMobile ? 'botNav' : 'sideNav';

    function btn(type) {
        return (
            <button className="navBtn">{type}</button>
        )
    }

    return (
        <div className={navStyle}>
            <NavLink exact to="/" activeClassName="is-active" activeStyle={{fontSize: "1.1em",color: "#F9F871", backgroundColor: '#006384' }} className={`${navStyle}-linkNav`}><HomeIcon fontSize="small" /> {btn('home')}  </NavLink>
            <NavLink to="/livres" activeClassName="is-active" activeStyle={{fontSize: "1.1em",color: "#F9F871", backgroundColor: '#006384' }} className={`${navStyle}-linkNav`}><MenuBookIcon fontSize="small" />{btn('livres')}</NavLink>
            <NavLink to="/jv" activeClassName="is-active" activeStyle={{fontSize: "1.1em",color: "#F9F871", backgroundColor: '#006384' }} className={`${navStyle}-linkNav`}><VideogameAssetIcon fontSize="small" />{btn('jv')}</NavLink>
            <NavLink to="/films" activeClassName="is-active" activeStyle={{fontSize: "1.1em",color: "#F9F871", backgroundColor: '#006384' }} className={`${navStyle}-linkNav`}><MovieIcon fontSize="small" />{btn('films')}</NavLink>
            <NavLink 
                to="/liens" 
                activeClassName="is-active" 
                activeStyle={{fontSize: "1.1em",color: "#F9F871", backgroundColor: '#006384' }} 
                className={`${navStyle}-linkNav`}
            >
                    <LinkIcon fontSize="small" />
                    {btn('links')}
            </NavLink>
        </div>
    );
}