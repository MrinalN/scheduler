import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  return {mode}
}

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property