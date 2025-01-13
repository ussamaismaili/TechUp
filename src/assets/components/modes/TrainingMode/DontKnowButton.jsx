import React, { useState } from 'react';
import '../../../styles/ButtonsTraining.scss';
import './DontKnowButton.scss';

export default function DontKnowButton({ setNextSlide, cardReactionArr, currentSlide, markAsDontKnow }) {
    const [unFamiliarWords, setUnFamiliarWords] = useState(0);

    const increaseWordsCount = () => {
        setUnFamiliarWords((prevState) => prevState + 1);
        markAsDontKnow(); // Call the markAsDontKnow function
        setNextSlide((prevState) => prevState + 1);
    };

    return (
        <button className="ButtonsTraining DontKnowButton" onClick={increaseWordsCount}>
            {unFamiliarWords === 0 ? 'Don\'t know' : `Don't know (${unFamiliarWords})`}
        </button>
    );
}
