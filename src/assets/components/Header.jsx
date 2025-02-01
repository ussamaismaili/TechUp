import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './Header.scss';
import logo from '../images/logo.svg';

export default function Header({ onLogoClick }) {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navRef]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="Header-wrapper">
            {/* Large screen navigation */}
            <ul className="Header large-screen-nav">
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
                    <li className="Header__menu dashboard-nav">
                        <Link to="/dashboard" className="Header__link Link">Dashboard</Link>
                        <button onClick={handleSignOut} className="Header__link Link signout-button">Sign Out</button>
                    </li>
                ) : (
                    <li className="Header__menu login-nav">
                        <Link to="/login" className="Header__link Link">Login</Link>
                    </li>
                )}
            </ul>

            {/* Small screen navigation with hamburger menu */}
            <div className="Header small-screen-nav">
                <div className="container">
                    <Link to="/" className="Header__logo Link" onClick={onLogoClick}>
                        <img src={logo} alt="Icon with cards" />
                        <div className="Header__logo-text-wrapper">
                            <div>ONLINE LEARNING</div>
                            <h2><span>TechUP</span> FLASHCARDS</h2>
                        </div>
                    </Link>
                    <div className="links">
                        <span className={`icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <ul id="nav" ref={navRef} className={isMenuOpen ? 'active' : ''}>
                            <li><Link to="/words" className="Header__link Link" onClick={closeMenu}>All words</Link></li>
                            <li><Link to="/game" className="Header__link Link" onClick={closeMenu}>Training</Link></li>
                            {user ? (
                                <>
                                    <li><Link to="/dashboard" className="Header__link Link" onClick={closeMenu}>Dashboard</Link></li>
                                    <li><button onClick={() => { handleSignOut(); closeMenu(); }} className="Header__link Link signout-button">Sign Out</button></li>
                                </>
                            ) : (
                                <li><Link to="/login" className="Header__link Link" onClick={closeMenu}>Login</Link></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
