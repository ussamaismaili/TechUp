import React, { useState, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import page from '../../../images/page.png';
import './WordCard.scss';

const WordCard = forwardRef((props, ref) => {
    const [translateCheck, setTranslateCheck] = useState(false); // Use boolean for translation state

    const handleChange = () => {
        setTranslateCheck(!translateCheck); // Toggle the translation display state
        props.countWordCheck(); // Call the countWordCheck function from props
    };

    return (
        <div className="WordCard">
            <img src={page} alt="Word card in the form of a notebook sheet" />
            <div className="word">{props.word}</div>
            <CSSTransition in={translateCheck} timeout={1000} classNames="translate-transition" unmountOnExit>
                <div className="word-translate">{props.translation}</div>
            </CSSTransition>
            {!translateCheck && (
                <button className="button-check" onClick={handleChange} ref={ref}>
                    Check
                </button>
            )}
        </div>
    );
});

export default WordCard;

WordCard.defaultProps = {
    word: 'Big Data',
    translation: 'Grande Donnée', // Default translation to French
};
