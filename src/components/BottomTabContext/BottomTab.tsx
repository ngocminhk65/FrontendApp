// simple context to share the current tab between the bottom tab navigator and the screens
import React from 'react';
export const bottomTabContext = React.createContext({});

export const TabProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = React.useState(0);
    
    return (
        <bottomTabContext.Provider value={{ currentTab, setCurrentTab }}>
        {children}
        </bottomTabContext.Provider>
    );
}