import React from 'react';
import { Link } from 'react-router-dom';
import ButtonTrain from './ButtonTrain';
import './SetOfWords.scss';

export default function SetOfWords({ categoryName, categoryImage }) {
    return (
        <section className="SetOfWords">
            <ButtonTrain />
            <img src={categoryImage} alt={`${categoryName} Card Screensaver`} />
            <h3>{categoryName}</h3>
        </section>
    );
}
