"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CSSOutputProps {
  css: string
}

export default function CSSOutput({ css }: CSSOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">CSS OUTPUT</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-slate-50 border border-slate-200 rounded p-4 text-xs font-mono text-slate-700 overflow-x-auto">
        {css}
      </pre>
    </div>
  )
}
