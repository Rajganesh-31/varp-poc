import React, { createContext, useContext, useState } from 'react';

interface Document {
  id: string;
  name: string;
  content: string;
}

interface DocumentContextType {
  document: Document | null;
  setDocument: (doc: Document) => void;
  clearDocument: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [document, setDocument] = useState<Document | null>(null);

  const clearDocument = () => {
    setDocument(null);
  };

  return (
    <DocumentContext.Provider value={{ document, setDocument, clearDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within DocumentProvider');
  }
  return context;
};
