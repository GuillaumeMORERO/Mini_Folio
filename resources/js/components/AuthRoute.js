import React from 'react';
import {Route} from "react-router-dom";
import { useHistory } from 'react-router-dom';

import MustLogin from './reuser/MustLogin';

export default function AuthRoute ({ children, ...props }) {
    
    const history = useHistory();
    let logged = props.isLogged;

    if (logged) {
        return <Route> {children} </Route>
    }

    return <MustLogin/>;

    // return (
    //     <>
    //         {/* {returner()} */}
    //         {logged ? (
    //                 <Route> {children} </Route>
    //             ) : (
    //                 history.push("/login")
    //             ) 
    //         }
    //     </>
    // )
  }
