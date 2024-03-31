"use client";
import { createContext, useState, useEffect } from 'react';

export const ViewPreferenceContext = createContext();

export const ViewPreferenceProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const [sharedState, setSharedState] = useState(null);

    useEffect(() =>  setMounted(true), [])

    useEffect(() => {
        const storedViewPref = localStorage.getItem('viewPref');
        if (storedViewPref) {
            setSharedState(storedViewPref);
        }else{
            setSharedState('Hint');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('viewPref', sharedState);
        console.log('viewPref state updated:', sharedState);
    }, [sharedState, mounted]);

    return (
        <ViewPreferenceContext.Provider value={{ sharedState, setSharedState }}>
        {children}
        </ViewPreferenceContext.Provider>
    );
};
