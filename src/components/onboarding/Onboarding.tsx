import { useState } from "react"
import { ChevronLeft, X } from "lucide-react"
import { StatusBar } from "./StatusBar"
import { StepIndicator } from "./StepIndicator"
import { WelcomeStep } from "./WelcomeStep"
import { PhoneStep } from "./PhoneStep"
import { VerifyStep } from "./VerifyStep"
import { AgeStep } from "./AgeStep"
import { NameStep } from "./NameStep"

const TOTAL_STEPS = 5

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [fading, setFading] = useState(false)

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))
  const restart = () => {
    setFading(true)
    setTimeout(() => {
      setStep(0)
      setResetKey((k) => k + 1)
      setTimeout(() => setFading(false), 50)
    }, 400)
  }

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-neutral-100 p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] relative shadow-xl border border-neutral-200 overflow-hidden">
        {/* iPhone status bar */}
        <StatusBar />

        {/* Inner safe area container */}
        <div className="absolute top-14 left-6 right-6 bottom-10 flex flex-col">
          {/* Header */}
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

          {/* Carousel */}
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
                  {i === 0 && <WelcomeStep onGetStarted={goNext} />}
                  {i === 1 && <PhoneStep onNext={goNext} active={step === 1} />}
                  {i === 2 && <VerifyStep onNext={goNext} active={step === 2} />}
                  {i === 3 && <AgeStep onNext={goNext} />}
                  {i === 4 && <NameStep onNext={() => { alert("Onboarding complete!"); restart(); }} active={step === 4} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade overlay for restart transition */}
        <div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          style={{
            opacity: fading ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* iPhone home indicator */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="w-[134px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  )
}
