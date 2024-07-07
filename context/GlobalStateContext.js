'use client';
import React, { createContext, useState } from 'react';

// Create the context
const GlobalStateContext = createContext();

// Create a provider component
const GlobalStateProvider = ({ children }) => {
  const [openedPages, setOpenedPages] = useState([]);
  const [currentPage, setCurrentPage] = useState('');

  return (
    <GlobalStateContext.Provider value={{openedPages, setOpenedPages, currentPage, setCurrentPage}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export {GlobalStateContext, GlobalStateProvider};