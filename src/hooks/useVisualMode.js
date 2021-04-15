import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition (nextMode) {
    setMode(nextMode)
    setHistory(prev => ([...prev, nextMode]))
  }
  
  function back() {
    
      const newArr = [...history]
      
      newArr.length > 1 ? newArr.pop() : newArr
      
      setMode(newArr[newArr.length - 1])
      setHistory(newArr)
  }
  return {mode, transition, back}
}
