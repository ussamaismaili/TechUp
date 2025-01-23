import React from 'react';

import Delete from '../../../images/delete.svg';
import '../../../styles/Button.scss';
import './ButtonDelete.scss';

export default function ButtonDelete( props ){

    const handleClick =  () => {
        const wordsStore = props.wordsStore;

        props.setIsDeleted( true );
        wordsStore.deleteWord( props.id );
        wordsStore.setNeedRefresh( !wordsStore.needRefresh );;
    };

    return(
        <img className = "ButtonDelete Button" src = { Delete } alt = "Delete Button" onClick = { handleClick }/>
    );
}                                                                                                               
