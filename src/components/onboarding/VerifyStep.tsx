import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface VerifyStepProps {
  onNext: () => void
  active?: boolean
}

export function VerifyStep({ onNext, active }: VerifyStepProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const isComplete = code.every((d) => d !== "")

  return (
    <div className="flex flex-col flex-1 pt-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Verify your phone number
        </h2>
        <p className="text-muted-foreground text-sm mt-4">
          Enter the verification code<br />sent to your phone number
        </p>
        <div className="flex gap-2.5 mt-8 justify-start">
          {code.map((digit, i) => (
            <span key={i} className="flex items-center gap-2.5">
              <input
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-10 h-12 text-center text-xl font-medium border-0 border-b-2 border-input rounded-none bg-transparent outline-none focus:border-foreground transition-colors"
                autoFocus={i === 0 && active}
              />
              {i === 2 && <span className="text-muted-foreground/40 text-xl mx-1">&nbsp;</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="pb-4">
        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="w-full h-12 rounded-full text-base font-medium disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
