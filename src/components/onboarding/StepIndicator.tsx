interface StepIndicatorProps {
  totalSteps: number
  currentStep: number
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i <= currentStep
              ? "w-8 bg-foreground"
              : "w-8 bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  )
}
