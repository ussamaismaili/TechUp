import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import KnowButton from './KnowButton';
import DontKnowButton from './DontKnowButton';
import './TrainingMode.scss';

export default function TrainingMode(props) {
    const [nextSlide, setNextSlide] = useState(0);
    const [cardReactionArr, setCardReactionArr] = useState(Array(props.wordsStore.wordsAPI.length).fill(false));
    const [currentSlide, setCurrentSlide] = useState(0);

    const markAsKnown = () => {
        props.wordsStore.markAsKnown(props.wordsStore.wordsAPI[currentSlide]);
        setCardReactionArr(prevState => {
            const newState = [...prevState];
            newState[currentSlide] = true;
            return newState;
        });
    };

    const markAsDontKnow = () => {
        props.wordsStore.markAsDontKnow(props.wordsStore.wordsAPI[currentSlide]);
        setCardReactionArr(prevState => {
            const newState = [...prevState];
            newState[currentSlide] = true;
            return newState;
        });
    };

    useEffect(() => {
        console.log(cardReactionArr, cardReactionArr[currentSlide]);
    }, [cardReactionArr]);

    return (
        <main className="TrainingMode">
            <Slider wordsStore={props.wordsStore} nextSlide={nextSlide} setCurrentSlide={setCurrentSlide} />
            <div className="Buttons">
                <DontKnowButton setNextSlide={setNextSlide} cardReactionArr={cardReactionArr} currentSlide={currentSlide} markAsDontKnow={markAsDontKnow} />
                <KnowButton setNextSlide={setNextSlide} cardReactionArr={cardReactionArr} currentSlide={currentSlide} markAsKnown={markAsKnown} />
            </div>
        </main>
    );
}
