"use client"

import { Bell } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { MobileNav } from "@/app/components/layout/mobile-nav"
import { UserNav } from "@/app/components/layout/user-nav"

export function TopBar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6">
            <MobileNav />
            <div className="flex flex-1 items-center gap-4">
                <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
            </div>
        </header>
    )
}
