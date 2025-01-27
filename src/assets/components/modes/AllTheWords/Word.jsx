import React, { useState } from 'react';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import './Word.scss';

const Word = ({ word, transcription, translation, id, wordsStore }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedWord, setEditedWord] = useState(word);
    const [editedTranscription, setEditedTranscription] = useState(transcription);
    const [editedTranslation, setEditedTranslation] = useState(translation);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        wordsStore.editWord(id, {
            english: editedWord,
            transcription: editedTranscription,
            french: editedTranslation
        });
        setIsEditing(false);
    };

    return (
        <div className="Word">
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={editedWord} 
                        onChange={(e) => setEditedWord(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={editedTranscription} 
                        onChange={(e) => setEditedTranscription(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={editedTranslation} 
                        onChange={(e) => setEditedTranslation(e.target.value)} 
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <div>{word}</div>
                    <div>{transcription}</div>
                    <div>{translation}</div>
                    <div className="Word__buttons">
                        <ButtonEdit onClick={handleEdit} />
                        <ButtonDelete id={id} wordsStore={wordsStore} setIsDeleted={() => {/* handle delete */}} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Word;
