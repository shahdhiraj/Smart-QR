"use client"

import { AlertTriangle, CreditCard, MessageSquare, Send } from "lucide-react"

import { MessagePreview } from "@/app/components/whatsapp/message-preview"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"

export default function WhatsAppPage() {
    const credits = 1200
    const maxCredits = 5000
    const costPerEvent = 250 // est
    const eventsRemaining = Math.floor(credits / costPerEvent)

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">WhatsApp Integration</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Credit Balance
                            </CardTitle>
                            <CardDescription>Manage your WhatsApp messaging credits.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{credits} Credits Available</span>
                                    <span className="text-muted-foreground">{Math.round((credits / maxCredits) * 100)}%</span>
                                </div>
                                <Progress value={(credits / maxCredits) * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                    Estimated coverage: ~{eventsRemaining} more small events.
                                </p>
                            </div>
                            {credits < 1500 && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Low Balance</AlertTitle>
                                    <AlertDescription>
                                        You might run out of credits during your next event.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Top Up Credits</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Usage Prediction
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Cost per Guest</span>
                                    <span className="font-medium">2 Credits</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Avg. Guests per Event</span>
                                    <span className="font-medium">150</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 mt-2">
                                    <span>Est. Cost per Event</span>
                                    <span className="font-bold">300 Credits</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-3">
                    <Card className="h-full bg-muted/20">
                        <CardHeader>
                            <CardTitle>Message Preview</CardTitle>
                            <CardDescription>This is how your guests will receive their photos.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center h-[500px]">
                            <MessagePreview />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
