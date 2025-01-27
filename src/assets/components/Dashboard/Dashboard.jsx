import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../../firebaseConfig';
import './Dashboard.scss';
import './Login.scss';

const Dashboard = observer(({ wordsStore }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const fetchUserData = useCallback(async (uid) => {
        try {
            await wordsStore.loadProgress();
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    }, [wordsStore]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchUserData(currentUser.uid);
            }
        });
        return () => unsubscribe();
    }, [fetchUserData]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (!user) {
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    const progress = wordsStore.getProgress();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={handleSignOut}>Sign Out</button>
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
