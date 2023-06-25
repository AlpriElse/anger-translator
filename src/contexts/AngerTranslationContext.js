import React, { createContext, useState } from 'react';

export const AngerTranslationContext = createContext();

export const AngerTranslationProvider = (props) => {
  const [angerPrompt, setAngerPrompt] = useState('');
  const [angerTranslation, setAngerTranslation] = useState('')
  return (
    <AngerTranslationContext.Provider value={{ angerPrompt, setAngerPrompt, angerTranslation, setAngerTranslation }}>
      {props.children}
    </AngerTranslationContext.Provider>
  );
};
