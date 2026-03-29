import { useState, useEffect } from "react"

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes().toString().padStart(2, "0")
      setTime(`${h}:${m}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center px-8 pt-4 pb-1">
      {/* Time */}
      <span className="text-sm font-semibold flex-1">{time}</span>

      {/* Dynamic Island / Notch */}
      <div className="w-[120px] h-[34px] bg-black rounded-full" />

      {/* Status icons */}
      <div className="flex items-center gap-1.5 flex-1 justify-end">
        {/* Cellular signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill="currentColor" />
          <path d="M4.7 8.8a4.7 4.7 0 016.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 5.8a8.2 8.2 0 0112 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.35" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
          <path d="M24 4v4a2 2 0 000-4z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
