"use client"
import CurveChart from "./curve-chart"
import EasingPresets from "./easing-presets"

interface ControlsPanelProps {
  steps: number
  onStepsChange: (steps: number) => void
  easing: string
  onEasingChange: (easing: string) => void
  baseOpacity: number
  onBaseOpacityChange: (opacity: number) => void
  direction: number
  onDirectionChange: (direction: number) => void
  baseColor: string
  onBaseColorChange: (color: string) => void
  stops: Array<{ position: number; opacity: number }>
}

export default function ControlsPanel({
  steps,
  onStepsChange,
  easing,
  onEasingChange,
  baseOpacity,
  onBaseOpacityChange,
  direction,
  onDirectionChange,
  baseColor,
  onBaseColorChange,
  stops,
}: ControlsPanelProps) {
  const directionPresets = [
    { label: "↓", value: 0 },
    { label: "↘", value: 45 },
    { label: "→", value: 90 },
    { label: "↗", value: 135 },
    { label: "↑", value: 180 },
    { label: "↖", value: 225 },
    { label: "←", value: 270 },
    { label: "↙", value: 315 },
  ]

  return (
    <div className="space-y-8">
      {/* Curve Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Curve</h3>
        <CurveChart stops={stops} />
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Direction</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {directionPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onDirectionChange(preset.value)}
                className={`py-2 px-3 rounded text-sm font-semibold transition-colors ${
                  direction === preset.value
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              value={direction}
              onChange={(e) => onDirectionChange(Number.parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm font-semibold text-slate-900 w-12 text-right">{direction}°</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Base Color</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => onBaseColorChange(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-slate-200"
          />
          <input
            type="text"
            value={baseColor.toUpperCase()}
            onChange={(e) => {
              if (e.target.value.match(/^#[0-9A-F]{6}$/i)) {
                onBaseColorChange(e.target.value)
              }
            }}
            className="flex-1 px-3 py-2 border border-slate-200 rounded text-sm font-mono"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      {/* Base Opacity Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Base Opacity</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={baseOpacity}
            onChange={(e) => onBaseOpacityChange(Number.parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm font-semibold text-slate-900 w-12 text-right">{baseOpacity}%</span>
        </div>
      </div>

      {/* Steps Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Steps</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="2"
            max="20"
            value={steps}
            onChange={(e) => onStepsChange(Number.parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm font-semibold text-slate-900 w-8 text-right">{steps}</span>
        </div>
      </div>

      {/* Easing Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Easing</h3>
        <EasingPresets easing={easing} onEasingChange={onEasingChange} />
      </div>
    </div>
  )
}
