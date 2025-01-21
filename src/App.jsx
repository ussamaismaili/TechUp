import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const wordsStore = props.wordsStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCategory) {
            wordsStore.loadWords(selectedCategory);
        }
    }, [selectedCategory, wordsStore]);

    if (wordsStore.error) {
        return <Error name={wordsStore.error.name} message={wordsStore.error.message} />;
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate('/game');
    };

    return (
        <>
            <CSSTransition in={wordsStore.isLoading} timeout={1000} classNames="Loader" mountOnEnter unmountOnExit>
                <Loader />
            </CSSTransition>

            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<SettingMode onCategorySelect={handleCategorySelect} />} />
                    <Route path="/words/*" element={<AllTheWords wordsStore={wordsStore} />} />
                    <Route path="/game" element={<TrainingMode wordsStore={wordsStore} selectedCategory={selectedCategory} />} />
                    <Route path="/dashboard" element={<Dashboard wordsStore={wordsStore} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
});

export default App;
