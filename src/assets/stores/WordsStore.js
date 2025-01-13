import { makeAutoObservable, runInAction } from 'mobx';
import bigData from '../data/bigdata.json';
import aiData from '../data/ai_terms.json';
import cloudComputingData from '../data/cloud_computing.json';

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
        if (bigData.includes(word)) return 'bigData';
        if (aiData.includes(word)) return 'AI';
        if (cloudComputingData.includes(word)) return 'cloudComputing';
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
            if (!this.knownWords.includes(word)) {
                this.knownWords.push(word);
            }
        });
    };

    markAsDontKnow = (word) => {
        runInAction(() => {
            if (!this.dontKnowWords.includes(word)) {
                this.dontKnowWords.push(word);
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
