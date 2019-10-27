import React, { useEffect, useRef } from "react"

/**
 * Hook that activates on keypress in document
 */
function useKeypress(ref, onKeydown) {
  function handleKeyPress(event) {
    if (ref.current) {
      onKeydown(event)
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyPress)
    }
  })
}

/**
 * Component that alerts if you click outside of it
 */
export default function KeypressNotifier(props) {
  const wrapperRef = useRef(null)
  useKeypress(wrapperRef, props.onKeydown)

  return <div ref={wrapperRef}>{props.children}</div>
}
