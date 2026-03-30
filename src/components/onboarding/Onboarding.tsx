import { useState, useRef } from "react"
import { ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBar } from "./StatusBar"
import { StepIndicator } from "./StepIndicator"
import { WelcomeStep } from "./WelcomeStep"
import { PhoneStep } from "./PhoneStep"
import { VerifyStep } from "./VerifyStep"
import { AgeStep } from "./AgeStep"
import { NameStep } from "./NameStep"

const TOTAL_STEPS = 5
const BUTTON_LABELS = ["Get Started", "Next", "Next", "Next", "Next"]

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [fading, setFading] = useState(false)
  const [, forceRender] = useState(0)

  // Store validity in a ref to avoid render loops, force render only on change
  const validRef = useRef<Record<number, boolean>>({ 0: true, 3: true })

  const setValid = (index: number, valid: boolean) => {
    if (validRef.current[index] !== valid) {
      validRef.current[index] = valid
      forceRender((n) => n + 1)
    }
  }

  const goNext = () => {
    if (step === TOTAL_STEPS - 1) {
      setFading(true)
      setTimeout(() => {
        setStep(0)
        setResetKey((k) => k + 1)
        validRef.current = { 0: true, 3: true }
        setTimeout(() => setFading(false), 50)
      }, 400)
      return
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const isCurrentValid = validRef.current[step] ?? false

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-neutral-100 p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] relative shadow-xl border border-neutral-200 overflow-hidden">
        <StatusBar />

        <div className="absolute top-14 left-6 right-6 bottom-10 flex flex-col">
          <div className="flex items-center justify-between pb-2 z-10 shrink-0">
            {step > 0 ? (
              <button
                onClick={goBack}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
            <StepIndicator totalSteps={TOTAL_STEPS} currentStep={step} />
            <div className="w-9" />
          </div>

          <div className="flex-1 relative">
            <div
              key={resetKey}
              className="absolute inset-0 flex"
              style={{
                width: `${TOTAL_STEPS * 100}%`,
                transform: `translateX(-${step * (100 / TOTAL_STEPS)}%)`,
                transition: "transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-full flex flex-col"
                  style={{
                    width: `${100 / TOTAL_STEPS}%`,
                    opacity: i === step ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {i === 0 && <WelcomeStep />}
                  {i === 1 && <PhoneStep active={step === 1} onValidChange={(v) => setValid(1, v)} />}
                  {i === 2 && <VerifyStep active={step === 2} onValidChange={(v) => setValid(2, v)} />}
                  {i === 3 && <AgeStep />}
                  {i === 4 && <NameStep active={step === 4} onValidChange={(v) => setValid(4, v)} />}
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 pt-4">
            <Button
              onClick={goNext}
              disabled={!isCurrentValid}
              className="w-full h-12 rounded-full text-base font-medium disabled:opacity-40"
            >
              {BUTTON_LABELS[step]}
            </Button>
          </div>
        </div>

        <div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          style={{
            opacity: fading ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="w-[134px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  )
}
