// https://loading.io/css/
import React from 'react'
import '../css/Loading.css'
export default function Loading({
  className,
  size = 64,
  highContrast = false }) {
  const smallDiv = <div
    style={{
      width: 51 / 64 * size,
      height: 51 / 64 * size,
    }}
  />
  return (
    <div className={"lds-ring " + className} style={{
      height: size,
      width: size,
      mixBlendMode: highContrast ? 'exclusion' : 'initial',
    }}>
      {smallDiv}
      {smallDiv}
      {smallDiv}
      {smallDiv}
    </div>
  )
}
