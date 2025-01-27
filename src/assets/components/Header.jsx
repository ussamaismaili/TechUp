// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './Header.scss';
import logo from '../images/logo.svg';

export default function Header({ onLogoClick }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <nav className="Header-wrapper">
            <ul className="Header">
                <li>
                    <Link to="/" className="Header__logo Link" onClick={onLogoClick}>
                        <img src={logo} alt="Icon with cards" />
                        <div className="Header__logo-text-wrapper">
                            <div>ONLINE LEARNING</div>
                            <h2><span>TechUP</span> FLASHCARDS</h2>
                        </div>
                    </Link>
                </li>
                <li className="Header__menu words">
                    <Link to="/words" className="Header__link Link">All words</Link>
                </li>
                <li className="Header__menu cards">
                    <Link to="/game" className="Header__link Link">Training</Link>
                </li>
                {user ? (
                    <>
                        <li className="Header__menu dashboard-nav">
                            <Link to="/dashboard" className="Header__link Link">Dashboard</Link>
                        </li>
                        <li className="Header__menu">
                            <button onClick={handleSignOut} className="Header__link Link">Sign Out</button>
                        </li>
                    </>
                ) : (
                    <li className="Header__menu login-nav">
                        <Link to="/login" className="Header__link Link">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
