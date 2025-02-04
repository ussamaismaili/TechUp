import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import necessary components from react-router-dom
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import Dashboard from './assets/components/Dashboard/Dashboard';
import NotFoundPage from './assets/components/NotFoundPage';
import Loader from './assets/components/Loader';
import Error from './assets/components/Error';
import Footer from './assets/components/Footer/Footer';
import Login from './assets/components/Dashboard/Login'; // Import Login component

import './App.css';

const App = observer((props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [user, setUser] = useState(null);
    const wordsStore = props.wordsStore;
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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

    const handleLogoClick = () => {
        setSelectedCategory(null); // Reset the selected category when navigating back to the home page
        navigate('/'); // Ensure navigation to the home page
    };

    return (
        <>
            <CSSTransition in={wordsStore.isLoading} timeout={1000} classNames="Loader" mountOnEnter unmountOnExit>
                <Loader />
            </CSSTransition>

            <div className="App">
                <Header onLogoClick={handleLogoClick} />
                <Routes>
                    <Route path="/TechUp" element={<SettingMode onCategorySelect={handleCategorySelect} />} />
                    <Route path="/words/*" element={<AllTheWords wordsStore={wordsStore} />} />
                    <Route path="/game" element={<TrainingMode wordsStore={wordsStore} selectedCategory={selectedCategory} />} />
                    <Route path="/dashboard" element={<Dashboard wordsStore={wordsStore} />} />
                    <Route path="/login" element={<Login />} /> {/* Add Login route */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
});

export default App;
