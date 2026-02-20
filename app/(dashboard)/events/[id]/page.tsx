"use client"

import {
    BarChart3,
    Camera,
    Download,
    Eye,
    Settings,
    Share2,
    Users,
} from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"

import { AISuggestions } from "@/app/components/dashboard/ai-suggestions"
import { StatCard } from "@/app/components/dashboard/stat-card"
import { OneQRCard } from "@/app/components/event-qr/one-qr-card"
import { PhotoGallery } from "@/app/components/events/photo-gallery"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function EventPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const id = params.id
    const activeTab = searchParams.get("tab") || "overview"

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Wedding: Mike & Julie
                    </h2>
                    <p className="text-muted-foreground">
                        Oct 24, 2024 • Live • ID: {id}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button>
                        <Settings className="mr-2 h-4 w-4" /> Manage
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Guests"
                    value="142"
                    icon={Users}
                    trend={{ value: 12, label: "new today", positive: true }}
                />
                <StatCard
                    title="Views"
                    value="1,240"
                    icon={Eye}
                    trend={{ value: 8, label: "from yesterday", positive: true }}
                />
                <StatCard
                    title="Downloads"
                    value="342"
                    icon={Download}
                />
                <StatCard
                    title="Photos"
                    value="450"
                    icon={Camera}
                />
            </div>

            <Tabs defaultValue={activeTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="guests">Guests</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="qr-code">QR Code</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    {/* Event Health & AI */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Event Health</CardTitle>
                                <CardDescription>
                                    Performance score based on guest engagement.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center gap-8">
                                <div className="relative h-32 w-32 flex items-center justify-center rounded-full border-4 border-emerald-500">
                                    <span className="text-3xl font-bold text-emerald-500">92</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        <span className="text-sm font-medium">High Engagement</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Your event is performing better than 85% of similar events.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="col-span-3">
                            <AISuggestions />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="guests" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Guest List</CardTitle>
                            <CardDescription>Manage guest access and permissions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-10 text-muted-foreground">
                                Guest table implementation...
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="gallery" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Photo Gallery</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PhotoGallery eventId={Array.isArray(id) ? id[0] : id || "unknown"} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="qr-code" className="space-y-4">
                    <div className="max-w-5xl mx-auto">
                        <OneQRCard event={{
                            id: Array.isArray(id) ? id[0] : id || "unknown",
                            title: "Wedding: Mike & Julie",
                            date: "Oct 24, 2024",
                            imageUrl: ""
                        }} />
                    </div>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                    <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/10">
                        Analytics Charts Placeholder
                    </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                    <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/10">
                        Event Settings Form Placeholder
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
