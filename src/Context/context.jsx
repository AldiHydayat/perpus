import React, { createContext } from 'react';

export const perpusContext = createContext();

export const Perpusprovider = ({ children }) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api`;

  return <perpusContext.Provider value={{ url }}>{children}</perpusContext.Provider>;
};
