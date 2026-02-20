"use client"

import { OneQRCard } from "@/app/components/event-qr/one-qr-card"

export default function EventQRPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Event QR</h2>
                <p className="text-muted-foreground">Manage and share your event QR codes.</p>
            </div>

            <div className="w-full max-w-6xl mx-auto">
                <OneQRCard event={{
                    id: "evt-123",
                    title: "Sarah & John's Wedding",
                    date: "September 15, 2024",
                    imageUrl: ""
                }} />
            </div>
        </div>
    )
}
