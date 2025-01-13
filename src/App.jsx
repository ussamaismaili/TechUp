import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import Dashboard from './assets/components/Dashboard/Dashboard';
import NotFoundPage from './assets/components/NotFoundPage';
import Loader from './assets/components/Loader';
import Error from './assets/components/Error';
import Footer from './assets/components/Footer/Footer';

import './App.css';

const App = observer((props) => {
    const wordsStore = props.wordsStore;

    useEffect(() => {
        wordsStore.refreshWordsAPI();
    }, [wordsStore]);

    if (wordsStore.error) {
        return <Error name={wordsStore.error.name} message={wordsStore.error.message} />;
    }

    return (
        <>
            <CSSTransition in={wordsStore.isLoading} timeout={1000} classNames="Loader" mountOnEnter unmountOnExit>
                <Loader />
            </CSSTransition>

            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<SettingMode />} />
                    <Route path="/words/*" element={<AllTheWords wordsStore={wordsStore} />} />
                    <Route path="/game" element={<TrainingMode wordsStore={wordsStore} />} />
                    <Route path="/dashboard" element={<Dashboard wordsStore={wordsStore} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
});

export default App;
