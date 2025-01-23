import React from 'react';
import ButtonTrain from './ButtonTrain';
import './SetOfWords.scss';

export default function SetOfWords({ categoryName, categoryImage, onCategorySelect }) {
    return (
        <section className="SetOfWords">
            <ButtonTrain category={categoryName} onCategorySelect={onCategorySelect} />
            <img src={categoryImage} alt={`${categoryName} Card Screensaver`} />
            <h3>{categoryName}</h3>
        </section>
    );
}
