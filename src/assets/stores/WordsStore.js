import { makeAutoObservable, runInAction } from 'mobx';
import bigData from '../data/bigdata.json';
import aiData from '../data/ai_terms.json';
import cloudComputingData from '../data/cloud_computing.json';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; // Import auth from your firebaseConfig

class WordsStore {
    wordsAPI = [];
    knownWords = [];
    dontKnowWords = [];
    error = null;
    isLoading = true;
    needRefresh = false;

    constructor() {
        makeAutoObservable(this);
        this.initializeWords();
    }

    initializeWords() {
        const combinedWords = [...bigData, ...aiData, ...cloudComputingData].map((word, index) => ({
            ...word,
            id: index + 1,
            translation: word.french || word.translation,
            category: word.category || this.getCategoryFromFile(word)
        }));
        runInAction(() => {
            this.wordsAPI = combinedWords;
            this.isLoading = false;
        });
    }

    getCategoryFromFile(word) {
        if (bigData.includes(word)) return 'Big Data';
        if (aiData.includes(word)) return 'AI';
        if (cloudComputingData.includes(word)) return 'Cloud Computing';
        return 'unknown';
    }

    setNeedRefresh = () => {
        runInAction(() => this.needRefresh = !this.needRefresh);
    };

    refreshWordsAPI = () => {
        try {
            const combinedWords = [...bigData, ...aiData, ...cloudComputingData].map((word, index) => ({
                ...word,
                id: index + 1,
                translation: word.french || word.translation,
                category: word.category || this.getCategoryFromFile(word)
            }));
            runInAction(() => {
                this.wordsAPI = combinedWords;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        } finally {
            runInAction(() => this.isLoading = false);
        }
    };

    getWordsByCategory(category) {
        return this.wordsAPI.filter(word => word.category === category);
    }

    editWord(id, newWord) {
        try {
            const wordIndex = this.wordsAPI.findIndex(word => word.id === id);
            if (wordIndex > -1) {
                runInAction(() => {
                    this.wordsAPI[wordIndex] = { ...this.wordsAPI[wordIndex], ...newWord };
                });
                this.setNeedRefresh();
            }
        } catch (error) {
            runInAction(() => this.error = error.message);
        }
    }

    deleteWord(id) {
        try {
            runInAction(() => {
                this.wordsAPI = this.wordsAPI.filter(word => word.id !== id);
            });
            this.setNeedRefresh();
        } catch (error) {
            runInAction(() => this.error = error.message);
        }
    }

    addNewWord = async newWord => {
        runInAction(() => this.isLoading = true);
        try {
            const newId = this.wordsAPI.length ? this.wordsAPI[this.wordsAPI.length - 1].id + 1 : 1;
            const wordToAdd = { ...newWord, id: newId };
            runInAction(() => {
                this.wordsAPI.push(wordToAdd);
            });
            this.setNeedRefresh();
        } catch (error) {
            runInAction(() => this.error = error.message);
        } finally {
            runInAction(() => this.isLoading = false);
        }
    };

    markAsKnown = (word) => {
        runInAction(() => {
            if (!this.knownWords.includes(word) && !this.dontKnowWords.includes(word)) {
                this.knownWords.push(word);
                this.dontKnowWords = this.dontKnowWords.filter(w => w.id !== word.id);
                this.saveProgress();
            }
        });
    };

    markAsDontKnow = (word) => {
        runInAction(() => {
            if (!this.dontKnowWords.includes(word) && !this.knownWords.includes(word)) {
                this.dontKnowWords.push(word);
                this.knownWords = this.knownWords.filter(w => w.id !== word.id);
                this.saveProgress();
            }
        });
    };

    getProgress = () => {
        return {
            totalCount: this.wordsAPI.length,
            knownCount: this.knownWords.length,
            dontKnowCount: this.dontKnowWords.length,
        };
    };

    setProgress = (progress) => {
        runInAction(() => {
            this.knownWords = progress.knownWords || [];
            this.dontKnowWords = progress.dontKnowWords || [];
        });
    };

    async saveProgress() {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                await setDoc(userDoc, {
                    knownWords: this.knownWords,
                    dontKnowWords: this.dontKnowWords
                });
            }
        } catch (error) {
            console.error('Error saving progress: ', error);
        }
    }

    async loadProgress() {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    this.setProgress({
                        knownWords: userData.knownWords || [],
                        dontKnowWords: userData.dontKnowWords || [],
                    });
                }
            }
        } catch (error) {
            console.error('Error loading progress: ', error);
        }
    }

    async loadWords(category) {
        this.isLoading = true;
        this.error = null;

        try {
            let response;
            switch (category) {
                case 'Big Data':
                    response = bigData;
                    break;
                case 'AI':
                    response = aiData;
                    break;
                case 'Cloud Computing':
                    response = cloudComputingData;
                    break;
                default:
                    throw new Error('Invalid category');
            }

            const words = response.map((word, index) => ({
                ...word,
                id: index + 1,
                translation: word.french || word.translation,
                category,
            }));

            runInAction(() => {
                this.wordsAPI = words;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.isLoading = false;
            });
        }
    }

    async fetchWordsByCategory(category) {
        // Example API endpoint: `https://api.example.com/words?category=${category}`
        // Uncomment and modify the following lines to integrate with an actual API
        // const response = await fetch(`https://api.example.com/words?category=${category}`);
        // const data = await response.json();
        // runInAction(() => {
        //     this.wordsAPI = data;
        // });
    }

    async refreshAllWordsAPI() {
        // Example API endpoint: `https://api.example.com/words`
        // Uncomment and modify the following lines to integrate with an actual API
        // const response = await fetch('https://api.example.com/words');
        // const data = await response.json();
        // runInAction(() => {
        //     this.wordsAPI = data;
        // });
    }
}

export default WordsStore;
