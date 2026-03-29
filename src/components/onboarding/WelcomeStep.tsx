import { Button } from "@/components/ui/button"

interface WelcomeStepProps {
  onGetStarted: () => void
}

export function WelcomeStep({ onGetStarted }: WelcomeStepProps) {
  return (
    <div className="flex flex-col flex-1 justify-end pb-4">
      <h1 className="text-4xl font-bold tracking-tight text-left leading-tight">
        Fluid<br />Onboarding
      </h1>
      <p className="text-muted-foreground text-left mt-4 text-sm">
        Designed to feel fast and intuitive<br />
        with buttery smooth transitions
      </p>
      <Button
        onClick={onGetStarted}
        className="w-full h-12 rounded-full text-base font-medium mt-8"
      >
        Get Started
      </Button>
    </div>
  )
}
