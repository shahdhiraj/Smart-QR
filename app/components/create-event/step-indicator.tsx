import { Check } from "lucide-react"

import { cn } from "@/app/lib/utils"

interface StepIndicatorProps {
    currentStep: number
    steps: { id: number; label: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
    return (
        <div className="relative flex w-full justify-between">
            <div className="absolute top-1/2 left-0 -z-10 h-0.5 w-full -translate-y-1/2 bg-muted" />
            <div
                className="absolute top-1/2 left-0 -z-10 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
                style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
            />
            {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                    <div
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                            currentStep === step.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : currentStep > step.id
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                        )}
                    >
                        {currentStep > step.id ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <span className="text-xs font-semibold">{step.id}</span>
                        )}
                    </div>
                    <span
                        className={cn(
                            "text-xs font-medium transition-colors",
                            currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    )
}
