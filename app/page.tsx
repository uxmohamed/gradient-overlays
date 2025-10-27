"use client"

import { useState, useCallback } from "react"
import GradientPreview from "@/components/gradient-preview"
import CSSOutput from "@/components/css-output"
import ControlsPanel from "@/components/controls-panel"

export default function Home() {
  const [steps, setSteps] = useState(8)
  const [easing, setEasing] = useState("easeInOutQuad")
  const [baseOpacity, setBaseOpacity] = useState(100)
  const [direction, setDirection] = useState(0)
  const [baseColor, setBaseColor] = useState("#ffffff")

  const generateGradientStops = useCallback(() => {
    const easingFn = (t: number) => {
      switch (easing) {
        case "linear":
          return t
        case "easeInQuad":
          return t * t
        case "easeOutQuad":
          return t * (2 - t)
        case "easeInOutQuad":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        case "easeInCubic":
          return t * t * t
        case "easeOutCubic":
          return 1 + (t - 1) * (t - 1) * (t - 1)
        case "easeInOutCubic":
          return t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2))
        case "easeInQuart":
          return t * t * t * t
        case "easeOutQuart":
          return 1 - (t - 1) * (t - 1) * (t - 1) * (t - 1)
        case "easeInOutQuart":
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1)
        case "easeInQuint":
          return t * t * t * t * t
        case "easeOutQuint":
          return 1 + (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1)
        case "easeInOutQuint":
          return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1)
        case "easeInExpo":
          return t === 0 ? 0 : Math.pow(2, 10 * t - 10)
        case "easeOutExpo":
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        case "easeInOutExpo":
          return t === 0
            ? 0
            : t === 1
              ? 1
              : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2
        case "easeInCirc":
          return 1 - Math.sqrt(1 - t * t)
        case "easeOutCirc":
          return Math.sqrt(1 - (t - 1) * (t - 1))
        case "easeInOutCirc":
          return t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
        default:
          return t
      }
    }

    const stops = []
    for (let i = 0; i <= steps; i++) {
      const position = (i / steps) * 100
      const t = i / steps
      const eased = easingFn(t)
      const opacity = baseOpacity * (1 - eased)
      stops.push({ position, opacity: Math.round(opacity) })
    }
    return stops
  }, [steps, easing, baseOpacity])

  const stops = generateGradientStops()

  const generateCSS = (smoothed: boolean) => {
    const gradientStops = stops
      .map(
        (stop) =>
          `${baseColor}${
            smoothed
              ? Math.round((stop.opacity / 100) * 255)
                  .toString(16)
                  .padStart(2, "0")
              : stop.opacity === baseOpacity
                ? "ff"
                : "00"
          } ${stop.position}%`,
      )
      .join(",\n  ")

    return `linear-gradient(
  ${direction}deg,
  ${gradientStops}
)`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <h1 className="text-3xl font-bold mb-12 font-mono text-slate-900 dark:text-slate-50">Smooth Gradient Overlays</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="space-y-6">
          <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-6">Preview</h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs font-bold text-slate-900 mb-3">SMOOTHED</p>
                <GradientPreview css={generateCSS(true)} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-3">SIMPLE</p>
                <GradientPreview css={generateCSS(false)} />
              </div>
            </div>

            <CSSOutput css={generateCSS(true)} />
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-6">Controls</h2>

            <ControlsPanel
              steps={steps}
              onStepsChange={setSteps}
              easing={easing}
              onEasingChange={setEasing}
              baseOpacity={baseOpacity}
              onBaseOpacityChange={setBaseOpacity}
              direction={direction}
              onDirectionChange={setDirection}
              baseColor={baseColor}
              onBaseColorChange={setBaseColor}
              stops={stops}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
