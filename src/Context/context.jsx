import React, { createContext } from 'react';

export const perpusContext = createContext();

export const Perpusprovider = ({ children }) => {
  const url = 'http://localhost:3100/api';

  return <perpusContext.Provider value={{ url }}>{children}</perpusContext.Provider>;
};
