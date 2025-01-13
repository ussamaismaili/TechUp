/* eslint-disable max-len */
import React from 'react';
import SetOfWords from './SetOfWords';
import bigDataImage from '../../../images/bigData.png';
import aiImage from '../../../images/ai.png';
import cloudComputingImage from '../../../images/cloudComputing.png';
import './SettingMode.scss';

export default function SettingMode() {
    return (
        <main className="SettingMode">
            <h1>Enhance your Tech keywords </h1>
            <p>
            Here are sets of tech keyword cards, organized by topic, to help you learn French translations and memorize new keywords simultaneously. 
            Enhance your knowledge by practicing several dozen words each day, continuously improving with every session
            </p>
            <div className="SettingMode__container">
                <SetOfWords categoryName="Big Data" categoryImage={bigDataImage} />
                <SetOfWords categoryName="AI (Artificial Intelligence)" categoryImage={aiImage} />
                <SetOfWords categoryName="Cloud Computing" categoryImage={cloudComputingImage} />
            </div>
        </main>
    );
}
