import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition (nextMode) {
    setMode(nextMode)
    setHistory(prev => ([...prev, nextMode]))
  }
  
  function back() {
    console.log(history)
     const newArr = [...history]
    console.log(newArr)
     newArr.pop()
     setMode(newArr[newArr.length - 1])
     setHistory(newArr)
  }
  return {mode, transition, back}
}
