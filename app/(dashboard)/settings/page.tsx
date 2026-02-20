"use client"

import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Separator } from "@/app/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile & Company</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Profile</CardTitle>
                            <CardDescription>Update your company details and public info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" defaultValue="Studio Camera" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" defaultValue="studio@example.com" />
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button>Save Changes</Button>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="branding" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Look & Feel</CardTitle>
                            <CardDescription>Customize your gallery appearance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="brandColor">Primary Brand Color</Label>
                                <div className="flex gap-2">
                                    <div className="h-10 w-10 rounded-md bg-indigo-600 border ring-offset-background ring-2 ring-ring" />
                                    <Input id="brandColor" defaultValue="#4f46e5" className="w-32" />
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button>Save Changes</Button>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="billing" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription</CardTitle>
                            <CardDescription>Manage your plan and invoices.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="font-medium">Pro Plan</div>
                                    <div className="text-sm text-muted-foreground">$29/month • Active</div>
                                </div>
                                <Button variant="outline">Manage Subscription</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
