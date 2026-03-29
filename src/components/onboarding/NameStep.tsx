import { useState } from "react"
import { Button } from "@/components/ui/button"

interface NameStepProps {
  onNext: () => void
  active?: boolean
}

export function NameStep({ onNext, active }: NameStepProps) {
  const [name, setName] = useState("")

  return (
    <div className="flex flex-col flex-1 pt-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Enter your name
        </h2>
        <p className="text-muted-foreground text-sm mt-4">
          This is how you'll appear to others
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus={active}
          className="mt-8 w-full h-12 text-base bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="pb-4">
        <Button
          onClick={onNext}
          disabled={name.trim().length === 0}
          className="w-full h-12 rounded-full text-base font-medium disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
