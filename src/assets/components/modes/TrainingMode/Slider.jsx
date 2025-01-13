import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import data from '../../../data/ai_terms.json';
import arrowBack from '../../../images/arrow-back.svg';
import arrowForward from '../../../images/arrow-forward.svg';
import WordCard from './WordCard';
import './Slider.scss';

let offset = 0;

const Slider = observer((props) => {
    const wordsStore = props.wordsStore;

    useEffect(() => {
        wordsStore.refreshWordsAPI();
    }, [wordsStore.needRefresh]);

    const [offsetLeft, setOffset] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const [learnedWords, setLearnedWords] = useState(0);
    let cardsArrLength = wordsStore.wordsAPI.length;
    const ref = useRef();

    const setSlideOffset = (offsetDirection) => {
        if (wordsStore.wordsAPI === undefined && wordsStore.wordsAPI.length === 0) cardsArrLength = data.length;
        if (offsetDirection === 'back') {
            offset -= 67;
            if (offset < 0) {
                offset = 67 * (cardsArrLength - 1);
            }
        } else {
            offset += 67;
            if (offset > 67 * (cardsArrLength - 1)) {
                offset = 0;
            }
        }
        setOffset(-offset);
    };

    useEffect(() => {
        setCardIndex(-offsetLeft / 67);
        props.setCurrentSlide(-offsetLeft / 67);
    }, [offsetLeft]);

    useEffect(() => setSlideOffset('forward'), [props.nextSlide]);

    const countWordCheck = () => {
        let currentLearnedWordsCount = learnedWords;
        currentLearnedWordsCount += 1;
        setLearnedWords(currentLearnedWordsCount);
        console.log(`Words studied: ${currentLearnedWordsCount}`);
    };

    return (
        <div className="Slider">
            <img src={arrowBack} alt="Back arrow" className="buttons-slider" onClick={() => setSlideOffset('back')} />
            <div className="Slider-wrapper">
                <div className="Slider-line">
                    <div className="Slider-frame" style={{ left: offsetLeft + 'vh' }}>
                        {wordsStore.wordsAPI !== undefined && wordsStore.wordsAPI.length !== 0 ?
                            wordsStore.wordsAPI.map((word, index) => (
                                <WordCard
                                    key={word.id}
                                    word={word.english} // Assuming 'english' holds the big data term
                                    translation={word.french} // Assuming 'french' holds the translation
                                    countWordCheck={countWordCheck}
                                    className="wordCard"
                                    ref={cardIndex === index ? ref : null}
                                />
                            )) :
                            data.map((word, index) => (
                                <WordCard key={index} {...word} countWordCheck={countWordCheck} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <img src={arrowForward} alt="Forward arrow" className="buttons-slider" onClick={() => setSlideOffset('forward')} />
        </div>
    );
});

WordCard.defaultProps = {
    word: 'Big Data',
    translate: 'Grande Donnée',
};

export default Slider;
