"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const [sharedLevelState, setSharedLevelState] = useState(null);

    useEffect(() =>  setMounted(true), [])

    useEffect(() => {
        const storedLevelState = localStorage.getItem('levelState');
        if (storedLevelState) {
            setSharedLevelState(storedLevelState);
        }else{
            setSharedLevelState('Intermediate');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('levelState', sharedLevelState);
        console.log('Level state updated:', sharedLevelState);
    }, [sharedLevelState, mounted]);

    return (
        <LevelContext.Provider value={{ levelState: sharedLevelState, setLevelState: setSharedLevelState }}>
        {children}
        </LevelContext.Provider>
    );
};

export const useLevelState = () => useContext(LevelContext);