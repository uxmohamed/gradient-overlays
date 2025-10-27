"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CurveChartProps {
  stops: Array<{ position: number; opacity: number }>
}

export default function CurveChart({ stops }: CurveChartProps) {
  const data = stops.map((stop) => ({
    position: stop.position,
    opacity: stop.opacity,
  }))

  return (
    <div className="w-full h-48 bg-slate-50 border border-slate-200 rounded p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="position" type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#64748b" }}
            label={{ value: "Opacity (%)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
            }}
            formatter={(value) => `${value}%`}
          />
          <Line
            type="monotone"
            dataKey="opacity"
            stroke="#3b82f6"
            dot={{ fill: "#1e293b", r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
