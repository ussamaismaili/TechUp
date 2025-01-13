import React, { useState } from 'react';
import '../../../styles/ButtonsTraining.scss';
import './KnowButton.scss';

export default function KnowButton({ setNextSlide, cardReactionArr, currentSlide, markAsKnown }) {
    const [familiarWords, setFamiliarWords] = useState(0);

    const increaseWordsCount = () => {
        setFamiliarWords((prevState) => prevState + 1);
        markAsKnown(); // Call the markAsKnown function
        setNextSlide((prevState) => prevState + 1);
    };

    return (
        <button
            disabled={cardReactionArr[currentSlide] !== false}
            className="ButtonsTraining KnowButton"
            onClick={increaseWordsCount}
        >
            {familiarWords === 0 ? 'Known' : `Known (${familiarWords})`}
        </button>
    );
}
