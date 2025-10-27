"use client"

import { useEffect, useRef } from "react"

interface GradientPreviewProps {
  css: string
  dark?: boolean
}

export default function GradientPreview({ css, dark = false }: GradientPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const gradient = css.replace(/\n\s+/g, " ")
      const backgroundImage = `url('https://images.pexels.com/photos/31023938/pexels-photo-31023938.jpeg?cs=srgb&dl=pexels-musaortac-31023938.jpg&fm=jpg')`
      containerRef.current.style.backgroundImage = `${gradient}, ${backgroundImage}`
      containerRef.current.style.backgroundSize = "cover"
      containerRef.current.style.backgroundPosition = "center"
    }
  }, [css])

  return (
    <div
      ref={containerRef}
      className={`w-full h-64 rounded border ${dark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-slate-100"}`}
    />
  )
}
