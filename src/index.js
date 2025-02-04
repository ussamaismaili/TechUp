import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'; // Using HashRouter instead of BrowserRouter

import WordsStore from './assets/stores/WordsStore';  // Correct import
import './index.css';
import App from './App';

const wordsStore = new WordsStore();  // Correct instantiation

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App wordsStore={wordsStore} />
        </Router>
    </React.StrictMode>
);
