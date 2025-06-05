
import React, { createContext, useContext, useRef, useCallback } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const announceRef = useRef();

  const announce = useCallback((message, priority = 'polite') => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
      announceRef.current.setAttribute('aria-live', priority);
    }
  }, []);

  const moveFocus = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }, []);

  const value = {
    announce,
    moveFocus,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;
