import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PhoneStepProps {
  onNext: () => void
  active?: boolean
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length === 0) return ""
  const countryCode = digits.slice(0, 1)
  const rest = digits.slice(1)
  if (rest.length === 0) return `+${countryCode}`
  if (rest.length <= 3) return `+${countryCode} (${rest}`
  if (rest.length <= 6) return `+${countryCode} (${rest.slice(0, 3)}) ${rest.slice(3)}`
  return `+${countryCode} (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6)}`
}

export function PhoneStep({ onNext, active }: PhoneStepProps) {
  const [phone, setPhone] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "")
    setPhone(formatPhone(raw))
  }

  const digits = phone.replace(/\D/g, "")

  return (
    <div className="flex flex-col flex-1 pt-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Enter your phone number
        </h2>
        <p className="text-muted-foreground text-sm mt-4">
          We'll send a verification code<br />to this phone number
        </p>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="+1 (555) 012-3456"
          value={phone}
          onChange={handleChange}
          autoFocus={active}
          className="mt-8 w-full h-12 text-base bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="pb-4">
        <Button
          onClick={onNext}
          disabled={digits.length < 10}
          className="w-full h-12 rounded-full text-base font-medium disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
