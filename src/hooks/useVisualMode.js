import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  useEffect(() => {
    setMode(history.slice(-1)[0]);
  }, [history]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    
    if (replace) {
      return setHistory((prevHistory) => ([ ...prevHistory.slice(0, -1), newMode]));
    }
    
    setHistory((prevHistory) => ([...prevHistory, newMode]));
  };

  const back = () => {
    if (history.length === 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  return{ mode, transition, back, history };
};