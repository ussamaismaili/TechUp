import React from 'react';

import bigDataImage from '../../../images/bigData.png';

import aiImage from '../../../images/ai.png';

import cloudComputingImage from '../../../images/cloudComputing.png';

import SetOfWords from './SetOfWords';

import './SettingMode.scss';

export default function SettingMode({ onCategorySelect }) {
    return (
        <main className="SettingMode">
            <h1>Enhance your Tech keywords 34</h1>
            <p>
                Here are sets of tech keyword cards, organized by topic, to help you learn French translations 
                and memorize new keywords simultaneously. 
                Enhance your knowledge by practicing several dozen words each day, continuously improving with 
                every session.
            </p>
            <div className="SettingMode__container">
                <SetOfWords categoryName="Big Data" categoryImage={bigDataImage} onCategorySelect={onCategorySelect}/>
                <SetOfWords categoryName="AI" categoryImage={aiImage} onCategorySelect={onCategorySelect} />
                <SetOfWords categoryName="Cloud Computing" categoryImage={cloudComputingImage}
                    onCategorySelect={onCategorySelect} />
            </div>
        </main>
    );
}
