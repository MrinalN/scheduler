import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (nextMode, replace = false) { 
    setMode(nextMode)
    replace === true ? setHistory (prev => ([...prev])) : setHistory(prev => ([...prev, nextMode])) 
  }
  
  function back() {
    
      const newArr = [...history];

      newArr.length > 1 && newArr.pop();

      setMode(newArr[newArr.length - 1]);
      setHistory(newArr);
  }
  return {mode, transition, back}
}
