import { useState } from "react"

interface NameStepProps {
  active?: boolean
  onValidChange: (valid: boolean) => void
}

export function NameStep({ active, onValidChange }: NameStepProps) {
  const [name, setName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    onValidChange(val.trim().length > 0)
  }

  return (
    <div className="flex flex-col flex-1 pt-4">
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
        onChange={handleChange}
        autoFocus={active}
        className="mt-8 w-full h-12 text-base bg-transparent outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
