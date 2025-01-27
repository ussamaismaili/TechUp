import React, { useState, useRef, useEffect } from 'react';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import ButtonSave from './ButtonSave';
import ButtonCancel from './ButtonCancel';

import './Word.scss';

const defaultAbsentInputObj = {
    word: false,
    transcription: false,
    translation: false
};

const defaultMistakes = {
    word: '',
    transcription: '',
    translation: ''
};

const mistakesText = {
    word: 'The word field must be filled with English letters. It cannot contain numbers or non-letter characters, except spaces and hyphens.',
    transcription: 'The transcription field cannot contain numbers or be empty.',
    translation: 'The translation field must be filled with French letters. It cannot contain numbers or non-letter characters, except spaces, hyphens, and apostrophes.'
};

const reWord = /^[a-zA-Z\s-]+$/;
const reTranscription = /^[^\d]+$/;
const reTranslation = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ\s-']+$/;

const Word = ({ word, transcription, translation, id, wordsStore }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [absentInput, setAbsentInput] = useState(defaultAbsentInputObj);
    const [fixedWord, setFixedWord] = useState({
        word,
        transcription,
        translation
    });
    const [inputMistakes, setInputMistakes] = useState(defaultMistakes);
    const [savePressed, setSavePressed] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const accordeonWord = useRef();

    useEffect(() => {
        // Initial validation check
        validateAllInputs();
    }, []);

    const checkInputsValidation = (name, value) => {
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

        console.log(`Validating ${name}:`, value); // Debugging

        if (!regexp.test(value.trim())) {
            setInputMistakes(prev => ({ ...prev, [name]: mistakeText }));
            console.log(`Validation failed for ${name}`); // Debugging
        } else {
            setInputMistakes(prev => ({ ...prev, [name]: '' }));
            console.log(`Validation passed for ${name}`); // Debugging
        }
    };

    const handleWordInputs = (e) => {
        const { name, value } = e.target;

        if (value.trim() === '') {
            e.target.classList.add('incorrect');
            setAbsentInput(prev => ({ ...prev, [name]: true }));
        } else {
            e.target.classList.remove('incorrect');
            setAbsentInput(prev => ({ ...prev, [name]: false }));
        }

        checkInputsValidation(name, value);
        setFixedWord(prev => ({ ...prev, [name]: value }));
    };

    const validateAllInputs = () => {
        Object.keys(fixedWord).forEach(key => {
            checkInputsValidation(key, fixedWord[key]);
        });
    };

    const saveChanges = () => {
        setSavePressed(prev => prev + 1);
        validateAllInputs();

        if (!Object.values(inputMistakes).join('') && !Object.values(absentInput).includes(true)) {
            const changedWord = {
                english: fixedWord.word.trim(),
                transcription: fixedWord.transcription.trim(),
                french: fixedWord.translation.trim(),
                tags: '',
                tags_json: []
            };
            wordsStore.editWord(id, changedWord);

            setIsEditing(false);
            setSavePressed(0);
            console.log('word saved', changedWord); // Debugging
        }
    };

    const resetChanges = () => {
        setFixedWord({ word, transcription, translation });
        setIsEditing(false);
        setAbsentInput(defaultAbsentInputObj);
        setSavePressed(0);
        setInputMistakes(defaultMistakes);
    };

    return (
        isEditing ? (
            <>
                <section className={isDeleted ? 'Word Word__active Word__hidden' : 'Word Word__active'}>
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
                    <div className="Word__buttons">
                        <ButtonCancel onClickCancel={resetChanges} />
                        <ButtonSave onClickSave={saveChanges} absentInput={absentInput} />
                        <ButtonDelete id={id} setIsDeleted={setIsDeleted} wordsStore={wordsStore} />
                    </div>
                </section>
                <div className={(savePressed > 0) && Object.values(inputMistakes).join('') ?
                    'Word__warning Word__warning_showed' : 'Word__warning'}
                    ref={accordeonWord}>
                    {Object.values(inputMistakes).map((mistake, index) => (
                        <div className="mistake" key={index}>{mistake}</div>
                    ))}
                </div>
            </>
        ) : (
            <section className={isDeleted ? 'Word Word__hidden' : 'Word'}>
                <div className="Word__property">{fixedWord.word}</div>
                <div className="Word__property">{fixedWord.transcription}</div>
                <div className="Word__property">{fixedWord.translation}</div>
                <div className="Word__buttons">
                    <ButtonEdit onClick={() => setIsEditing(true)} />
                    <ButtonDelete id={id} setIsDeleted={setIsDeleted} wordsStore={wordsStore} />
                </div>
            </section>
        )
    );
};

export default Word;
