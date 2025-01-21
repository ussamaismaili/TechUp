import React from 'react';
// import { Link } from 'react-router-dom';

import buttonTrain from '../../../images/buttonTrain.svg';
import './ButtonTrain.scss';

export default function ButtonTrain({ category, onCategorySelect }) {
    const handleClick = () => {
        onCategorySelect(category);
    };

    return (
        <button onClick={handleClick}>
            <img src={buttonTrain} alt="Train Cards Button" className="ButtonTrain" />
        </button>
    );
}
