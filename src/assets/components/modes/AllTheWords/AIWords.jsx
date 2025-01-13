import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';

const AIWords = observer(({ wordsStore }) => {
    useEffect(() => {
        wordsStore.refreshWordsAPI();
    }, [wordsStore]);

    const [wordAddPressed, setWordAddPressed] = useState(false);

    const handleButtonPressed = () => {
        setWordAddPressed(!wordAddPressed);
    };

    const words = wordsStore.getWordsByCategory('AI');

    return (
        <main className="AllTheWords">
            <div className="AllTheWords__title">
                <div>Word</div>
                <div>Transcription</div>
                <div>Translation (French)</div>
                <button className="AllTheWords__buttonAdd" onClick={handleButtonPressed}>Add a word</button>
            </div>
            <WordAddingForm
                word=""
                transcription=""
                translation=""
                wordAddPressed={wordAddPressed}
                setWordAddPressed={setWordAddPressed}
                wordsStore={wordsStore}
                category="AI"
            />
            {words.length ? (
                words.map((word) => (
                    <Word
                        key={word.id}
                        word={word.english}
                        transcription={word.transcription}
                        translation={word.french}
                        id={word.id}
                        wordsStore={wordsStore}
                    />
                ))
            ) : (
                <div className="AllTheWords__empty">No words available in this category.</div>
            )}
        </main>
    );
});

export default AIWords;
