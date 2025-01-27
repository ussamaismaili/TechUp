import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import ButtonSave from './ButtonSave';
import './Word.scss';

const defaultAbsentInputObj = {
    word: true,
    transcription: true,
    translation: true
};

const defaultMistakes = {
    word: '',
    transcription: '',
    translation: ''
};

const mistakesText = {
    word: 'The word field must be filled with English letters. It cannot contain numbers or non-letter characters.',
    transcription: 'The transcription field cannot contain numbers, spaces, or be empty.',
    translation: 'The translation field must be filled with French letters. It cannot contain numbers or non-letter characters.'
};

const reWord = /[^a-zA-Z]+/;
const reTranscription = /[\d\s]+/;
const reTranslation = /[^a-zA-Zàâçéèêëîïôûùüÿñæœ]+/;  // Updated regex for French letters

const defaultInputs = {
    word: '',
    transcription: '',
    translation: ''
};

const WordAddingForm = observer((props) => {
    const wordsStore = props.wordsStore;

    const [absentInput, setAbsentInput] = useState(defaultAbsentInputObj);
    const [fixedWord, setFixedWord] = useState(defaultInputs);
    const [inputMistakes, setInputMistakes] = useState(defaultMistakes);
    const [savePressed, setSavePressed] = useState(0);
    const accordeonWord = useRef();

    const checkInputsValidation = (e) => {
        const name = e.target.name;
        let regexp;
        let mistakeText;

        if (name === 'word') {
            regexp = reWord;
            mistakeText = mistakesText.word;
        } else if (name === 'translation') {
            regexp = reTranslation;
            mistakeText = mistakesText.translation;
        } else {
            regexp = reTranscription;
            mistakeText = mistakesText.transcription;
        }

        regexp.test(e.target.value) ?
            setInputMistakes({ ...inputMistakes, [name]: mistakeText }) :
            setInputMistakes({ ...inputMistakes, [name]: '' });
    };

    const saveChanges = () => {
        setSavePressed(prevState => prevState + 1);
        if (!Object.values(inputMistakes).join('')) {
            setSavePressed(0);

            const newWord = {
                english: fixedWord.word,
                transcription: fixedWord.transcription,
                french: fixedWord.translation,  // Updated to 'french' field
                category: props.category  // Add category to new word
            };

            wordsStore.addNewWord(newWord);
            wordsStore.setNeedRefresh(!props.wordAddPressed);
            setFixedWord(defaultInputs);
            props.setWordAddPressed(!props.wordAddPressed);
        }
    };

    const handleWordInputs = e => {
        if (e.target.value === '') {
            e.target.classList.add('incorrect');
            setAbsentInput({ ...absentInput, [e.target.name]: true });
        } else {
            e.target.classList.remove('incorrect');
            setAbsentInput({ ...absentInput, [e.target.name]: false });
        }

        checkInputsValidation(e);
        setFixedWord({ ...fixedWord, [e.target.name]: e.target.value.toLowerCase() });
    };

    return (
        <>
            <section className={props.wordAddPressed ? 'Word Word__active' : 'Word Word__active Word__hidden'}>
                <div className="Word__property word-word">
                    <input type="text" value={fixedWord.word}
                        name="word" onChange={handleWordInputs} />
                </div>
                <div className="Word__property word-transcription">
                    <input type="text" value={fixedWord.transcription}
                        name="transcription" onChange={handleWordInputs} />
                </div>
                <div className="Word__property word-translation">
                    <input type="text" value={fixedWord.translation}
                        name="translation" onChange={handleWordInputs} />
                </div>
                <div className="Word__options">
                    <ButtonSave onClickSave={saveChanges} absentInput={absentInput} />
                </div>
            </section>
            {<div className={(savePressed > 0) && Object.values(inputMistakes).join('') ?
                'Word__warning Word__warning_showed' : 'Word__warning'}
                ref={accordeonWord}>
                {Object.values(inputMistakes).map((mistake, index) => {
                    return (
                        <div className="mistake" key={index}>{mistake}</div>
                    );
                })}
            </div>}
        </>
    );
});

export default WordAddingForm;
