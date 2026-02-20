"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { EventDetails } from "@/app/components/create-event/event-details"
import { ExperienceSettings } from "@/app/components/create-event/experience-settings"
import { PreviewPublish } from "@/app/components/create-event/preview-publish"
import { StepIndicator } from "@/app/components/create-event/step-indicator"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

const steps = [
    { id: 1, label: "Event Details" },
    { id: 2, label: "Experience" },
    { id: 3, label: "Review & Publish" },
]

export default function CreateEventPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        eventName: "",
        date: "",
        location: "",
        expectedGuests: "",
        allowGuestUploads: true,
        enableFaceMatch: true,
        enableWatermark: false,
        isPrivate: false,
    })

    const updateData = (newData: any) => {
        setFormData((prev) => ({ ...prev, ...newData }))
    }

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        } else {
            handlePublish()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handlePublish = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        // Mock ID for new event and redirect to QR tab
        router.push("/events/new-event-123?tab=qr-code")
    }

    return (
        <div className="container max-w-2xl py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
                <StepIndicator currentStep={currentStep} steps={steps} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{steps[currentStep - 1].label}</CardTitle>
                    <CardDescription>
                        {currentStep === 1 && "Start by adding the basic details of your event."}
                        {currentStep === 2 && "Customize how guests interact with your event."}
                        {currentStep === 3 && "Review settings and publish your event live."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentStep === 1 && (
                        <EventDetails data={formData} updateData={updateData} />
                    )}
                    {currentStep === 2 && (
                        <ExperienceSettings data={formData} updateData={updateData} />
                    )}
                    {currentStep === 3 && <PreviewPublish data={formData} />}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 1 || isLoading}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {currentStep === steps.length ? "Publish Event" : "Next"}
                        {currentStep !== steps.length && !isLoading && (
                            <ArrowRight className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
