"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

import { EventCard } from "@/app/components/events/event-card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function EventsPage() {
    const events = [
        {
            id: "1",
            title: "Wedding: Mike & Julie",
            date: "Oct 24, 2024",
            status: "Live" as const,
            guests: 142,
            imageUrl: "",
        },
        {
            id: "2",
            title: "Tech Conference 2024",
            date: "Nov 12, 2024",
            status: "Draft" as const,
            guests: 0,
            imageUrl: "",
        },
        {
            id: "3",
            title: "Summer Gala",
            date: "Aug 15, 2024",
            status: "Expired" as const,
            guests: 350,
            imageUrl: "",
        },
        {
            id: "4",
            title: "Company Retreat",
            date: "Sep 05, 2024",
            status: "Live" as const,
            guests: 45,
            imageUrl: "",
        },
    ]

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">My Events</h2>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/create-event">
                            <Plus className="mr-2 h-4 w-4" /> Create Event
                        </Link>
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Events</TabsTrigger>
                    <TabsTrigger value="live">Live</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                    <TabsTrigger value="expired">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {events.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="live" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {events.filter(e => e.status === 'Live').map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="draft" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {events.filter(e => e.status === 'Draft').map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="expired" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {events.filter(e => e.status === 'Expired').map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
