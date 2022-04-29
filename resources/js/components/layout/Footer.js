import React from 'react';

import './style.scss';

import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Header() {
    return (
        <div className="footer">
            <a href="https://www.linkedin.com/in/guillaume-morero/">
                <div className="footer-left">
                    <LinkedInIcon/>
                    <p className="footer-txt">Guillaume MORERO - 2021</p>
                </div>
            </a>

            <div className="footer-right">
                <a href="https://github.com/GuillaumeMORERO/CV-online" >
                    <p className="footer-txt">GitHub de ce CV</p>
                </a>
            </div>
        </div>
    );
}

export default Header;