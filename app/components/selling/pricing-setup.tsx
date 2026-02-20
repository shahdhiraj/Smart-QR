"use client"

import { DollarSign } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"

export function PricingSetup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pricing Configuration</CardTitle>
                <CardDescription>set your prices for photo downloads.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Enable Photo Selling</Label>
                        <p className="text-sm text-muted-foreground">
                            Allow guests to purchase high-res downloads.
                        </p>
                    </div>
                    <Switch />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="single-price">Single Photo Price</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="single-price" type="number" placeholder="0.00" className="pl-9" defaultValue="5.00" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bundle-price">All Photos Bundle</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="bundle-price" type="number" placeholder="0.00" className="pl-9" defaultValue="25.00" />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
