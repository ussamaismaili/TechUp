import React from 'react';
import './Footer.scss';

export default function Footer() {
    // Fetch the app's name from the Header__logo-text-wrapper class
    const appNameElement = document.querySelector('.Header__logo-text-wrapper h2 span');
    const appName = appNameElement ? appNameElement.textContent : 'APP NAME';

    return (
        <footer className="Footer-wrapper">
            <div className="Footer">
                <div className="Footer__left">
                    © Made by ISMAILI OUSSAMA 2025
                </div>
                <div className="Footer__right">
                    <span className="app-name">
                        {appName} FLASHCARDS
                    </span>
                </div>
            </div>
        </footer>
    );
}
