import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';
import cat from '../images/not-found-cat.svg';

export default function NotFoundPage(){
    return(
        <main className = "NotFoundPage">
            <h2 className = "NotFoundPage__title">Page not found</h2>
            <img className = "NotFoundPage__img" src = { cat } alt = "Cat in a box with a sign 404" />
            <p className = "NotFoundPage__question">Let's get back to 
                <Link to = "/" className = "NotFoundPage__Link">choice of cards</Link>?</p>
        </main>
    );
}
