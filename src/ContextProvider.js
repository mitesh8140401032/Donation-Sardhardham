import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export default function ContextProvider(props) {
    const [lang, setLang] = useState("Eng");



    return (
        <MyContext.Provider value={{ lang, setLang }}>
            {props.children}
        </MyContext.Provider>
    );
}
