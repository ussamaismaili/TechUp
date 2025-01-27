import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import './Dashboard.scss';
import './Login.scss';

const Dashboard = observer(({ wordsStore }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const fetchUserData = useCallback(async (uid) => {
        try {
            await wordsStore.loadProgress();
        } catch (error) {
            console.error('Error fetching user data: ', error);
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

    const handleAuth = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;
                await setDoc(doc(db, 'users', newUser.uid), {
                    username: username,
                    email: email
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    if (!user) {
        return (
            <div className="auth">
                <h1>Login or Signup to see and track your daily progress</h1>
                <form onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                    )}
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
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        );
    }

    const progress = wordsStore.getProgress();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <h2>Hello, {user.email}!</h2>
            <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
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
