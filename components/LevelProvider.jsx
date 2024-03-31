"use client";
import { createContext, useState, useEffect } from 'react';

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const [sharedState, setSharedState] = useState(null);

    useEffect(() =>  setMounted(true), [])

    useEffect(() => {
        const storedLevelState = localStorage.getItem('levelState');
        if (storedLevelState) {
            setSharedState(storedLevelState);
        }else{
            setSharedState('Intermediate');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('levelState', sharedState);
    }, [sharedState, mounted]);

    return (
        <LevelContext.Provider value={{ sharedState, setSharedState }}>
        {children}
        </LevelContext.Provider>
    );
};

