import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import KnowButton from './KnowButton';
import DontKnowButton from './DontKnowButton';
import Loader from '../../Loader';
import './TrainingMode.scss';

export default function TrainingMode({ wordsStore, selectedCategory }) {
    const [nextSlide, setNextSlide] = useState(0);
    const [cardReactionArr, setCardReactionArr] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setCardReactionArr(Array(wordsStore.wordsAPI.length).fill(false));
    }, [wordsStore.wordsAPI]);

    const markAsKnown = () => {
        wordsStore.markAsKnown(wordsStore.wordsAPI[currentSlide]);
        setCardReactionArr(prevState => {
            const newState = [...prevState];
            newState[currentSlide] = true;
            return newState;
        });
    };

    const markAsDontKnow = () => {
        wordsStore.markAsDontKnow(wordsStore.wordsAPI[currentSlide]);
        setCardReactionArr(prevState => {
            const newState = [...prevState];
            newState[currentSlide] = true;
            return newState;
        });
    };

    if (wordsStore.isLoading) {
        return <Loader />;
    }

    return (
        <main className="TrainingMode">
            <Slider wordsStore={wordsStore} nextSlide={nextSlide} setCurrentSlide={setCurrentSlide} />
            <div className="Buttons">
                <DontKnowButton setNextSlide={setNextSlide} cardReactionArr={cardReactionArr} currentSlide={currentSlide} markAsDontKnow={markAsDontKnow} />
                <KnowButton setNextSlide={setNextSlide} cardReactionArr={cardReactionArr} currentSlide={currentSlide} markAsKnown={markAsKnown} />
            </div>
        </main>
    );
}
