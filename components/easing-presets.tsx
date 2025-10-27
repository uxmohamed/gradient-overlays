"use client"

// Easing functions
const easeInQuad = (t: number) => t * t
const easeOutQuad = (t: number) => t * (2 - t)
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
const easeInCubic = (t: number) => t * t * t
const easeOutCubic = (t: number) => --t * t * t + 1
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1)
const easeInQuart = (t: number) => t * t * t * t
const easeOutQuart = (t: number) => 1 - --t * t * t * t
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t)
const easeInQuint = (t: number) => t * t * t * t * t
const easeOutQuint = (t: number) => 1 + --t * t * t * t * t
const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t)
const easeInExpo = (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10))
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
const easeInCirc = (t: number) => 1 - Math.sqrt(1 - t * t)
const easeOutCirc = (t: number) => Math.sqrt(1 - --t * t)
const easeInOutCirc = (t: number) =>
  t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2

const easingFunctions: { name: string; label: string; fn: (t: number) => number }[] = [
  { name: "linear", label: "linear", fn: (t) => t },
  { name: "easeInQuad", label: "easeInQuad", fn: easeInQuad },
  { name: "easeOutQuad", label: "easeOutQuad", fn: easeOutQuad },
  { name: "easeInOutQuad", label: "easeInOutQuad", fn: easeInOutQuad },
  { name: "easeInCubic", label: "easeInCubic", fn: easeInCubic },
  { name: "easeOutCubic", label: "easeOutCubic", fn: easeOutCubic },
  { name: "easeInOutCubic", label: "easeInOutCubic", fn: easeInOutCubic },
  { name: "easeInQuart", label: "easeInQuart", fn: easeInQuart },
  { name: "easeOutQuart", label: "easeOutQuart", fn: easeOutQuart },
  { name: "easeInOutQuart", label: "easeInOutQuart", fn: easeInOutQuart },
  { name: "easeInQuint", label: "easeInQuint", fn: easeInQuint },
  { name: "easeOutQuint", label: "easeOutQuint", fn: easeOutQuint },
  { name: "easeInOutQuint", label: "easeInOutQuint", fn: easeInOutQuint },
  { name: "easeInExpo", label: "easeInExpo", fn: easeInExpo },
  { name: "easeOutExpo", label: "easeOutExpo", fn: easeOutExpo },
  { name: "easeInOutExpo", label: "easeInOutExpo", fn: easeInOutExpo },
  { name: "easeInCirc", label: "easeInCirc", fn: easeInCirc },
  { name: "easeOutCirc", label: "easeOutCirc", fn: easeOutCirc },
  { name: "easeInOutCirc", label: "easeInOutCirc", fn: easeInOutCirc },
]

interface EasingPresetsProps {
  easing: string
  onEasingChange: (easing: string) => void
}

function generateGradientStops(easingFn: (t: number) => number): string {
  const stops: string[] = []
  const steps = 20

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const eased = Math.max(0, Math.min(1, easingFn(t)))
    const opacity = Math.round(eased * 100)
    stops.push(`rgba(0, 0, 0, ${eased}) ${opacity}%`)
  }

  return stops.join(", ")
}

export default function EasingPresets({ easing, onEasingChange }: EasingPresetsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
      {easingFunctions.map((fn) => (
        <button
          key={fn.name}
          onClick={() => onEasingChange(fn.name)}
          className={`p-3 rounded border transition-all ${
            easing === fn.name ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div
            className="h-12 rounded mb-2"
            style={{
              background: `linear-gradient(to bottom, ${generateGradientStops(fn.fn)})`,
            }}
          />
          <div className="text-center text-xs font-mono text-slate-600">{fn.label}</div>
        </button>
      ))}
    </div>
  )
}
