import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';
import './WordsPage.scss';

const AllTheWords = observer(({ wordsStore }) => {
    useEffect(() => {
        wordsStore.refreshWordsAPI();
    }, [wordsStore]);

    return (
        <main className="WordsPage">
            <nav className="WordsPage__nav">
                <Link to="bigdata">Big Data</Link>
                <Link to="ai">AI (Artificial Intelligence)</Link>
                <Link to="cloudcomputing">Cloud Computing</Link>
            </nav>
            <Routes>
                <Route path="bigdata" element={<CategoryWords wordsStore={wordsStore} category="bigData" />} />
                <Route path="ai" element={<CategoryWords wordsStore={wordsStore} category="AI" />} />
                <Route path="cloudcomputing" element={<CategoryWords wordsStore={wordsStore} category="cloudComputing" />} />
            </Routes>
        </main>
    );
});

const CategoryWords = observer(({ wordsStore, category }) => {
    const [wordAddPressed, setWordAddPressed] = useState(false);

    const handleButtonPressed = () => {
        setWordAddPressed(!wordAddPressed);
    };

    const words = wordsStore.getWordsByCategory(category);

    return (
        <div className="WordsPage__category">
            <div className="AllTheWords__title">
                <div>Word</div>
                <div>Transcription</div>
                <div>Translation (French)</div>
                <button className="AllTheWords__buttonAdd" onClick={handleButtonPressed}>Add a word</button>
            </div>
            {wordAddPressed && (
                <WordAddingForm
                    word=""
                    transcription=""
                    translation=""
                    wordAddPressed={wordAddPressed}
                    setWordAddPressed={setWordAddPressed}
                    wordsStore={wordsStore}
                    category={category}
                />
            )}
            <ul className="WordsPage__category__list">
                {words.length ? (
                    words.map((word) => (
                        <li key={word.id}>
                            <Word
                                word={word.english}
                                transcription={word.transcription}
                                translation={word.french}
                                id={word.id}
                                wordsStore={wordsStore}
                            />
                        </li>
                    ))
                ) : (
                    <li className="WordsPage__empty">No words available in this category.</li>
                )}
            </ul>
        </div>
    );
});

export default AllTheWords;
