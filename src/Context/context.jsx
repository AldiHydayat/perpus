import React, { createContext } from 'react';

export const perpusContext = createContext();

export const Perpusprovider = ({ children }) => {
  const url = 'https://backend-perpus.herokuapp.com/api';

  return <perpusContext.Provider value={{ url }}>{children}</perpusContext.Provider>;
};
