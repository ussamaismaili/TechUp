import React from 'react';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import './Word.scss';

const Word = ({ word, transcription, translation, id, wordsStore }) => {
    return (
        <div className="Word">
            <div>{word}</div>
            <div>{transcription}</div>
            <div>{translation}</div>
            <div className="Word__buttons">
                <ButtonEdit onClick={() => {/* handle edit */}} />
                <ButtonDelete id={id} wordsStore={wordsStore} setIsDeleted={() => {/* handle delete */}} />
            </div>
        </div>
    );
};

export default Word;
