import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './Dashboard.scss';

const Dashboard = observer(({ wordsStore }) => {
    useEffect(() => {
        wordsStore.refreshWordsAPI();
    }, [wordsStore]);

    const progress = wordsStore.getProgress();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="statistics">
                <div className="stat">
                    <h2>Total Cards</h2>
                    <p>{progress.totalCount}</p>
                </div>
                <div className="stat">
                    <h2>Known Cards</h2>
                    <p>{progress.knownCount}</p>
                </div>
                <div className="stat">
                    <h2>Don't Know Cards</h2>
                    <p>{progress.dontKnowCount}</p>
                </div>
            </div>
            <div className="progress">
                <h2>Progress</h2>
                <div className="cards-list">
                    <div className="known-cards">
                        <h3>Known Cards</h3>
                        {wordsStore.knownWords.map((word) => (
                            <div key={word.id} className="card">
                                {word.english} - {word.french}
                            </div>
                        ))}
                    </div>
                    <div className="dont-know-cards">
                        <h3>Don't Know Cards</h3>
                        {wordsStore.dontKnowWords.map((word) => (
                            <div key={word.id} className="card">
                                {word.english} - {word.french}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Dashboard;
