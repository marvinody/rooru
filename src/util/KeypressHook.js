import { useEffect } from "react"

/**
 * Hook that activates on keypress in document
 */
export default function useKeypress(onKeydown) {

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", onKeydown)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", onKeydown)
    }
  })
}

