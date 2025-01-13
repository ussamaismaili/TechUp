import React from 'react';

import './Error.scss';
import warning from '../images/warning-error.svg';

export default function Error( props ){
    return(
        <div className = "Error">
            <img src = { warning } className = "Error__img"
                alt = "Error Warning: Exclamation Mark on Triangular Plate" />
            <div className = "Error__notification">
                <h2>An error occurred</h2>
                <h1>{ props.name }</h1>
                <h3>{ props.message }</h3>
            </div>
        </div>
    );
}
