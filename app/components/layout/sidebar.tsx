"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BarChart3,
    Calendar,
    Camera,
    Home,
    ImageIcon,
    MessageSquare,
    QrCode,
    Settings,
    Sparkles,
} from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const items = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/events", icon: Calendar, label: "My Events" },
        { href: "/create-event", icon: Camera, label: "Create Event" },
        { href: "/event-qr", icon: QrCode, label: "Event QR" },
        { href: "/whatsapp", icon: MessageSquare, label: "WhatsApp" },
        { href: "/analytics", icon: BarChart3, label: "Analytics" },
        { href: "/selling", icon: ImageIcon, label: "Photo Selling" },
        { href: "/beam", icon: Sparkles, label: "Beam / AI" },
        { href: "/settings", icon: Settings, label: "Settings" },
    ]

    return (
        <div className={cn("pb-12 h-screen bg-sidebar text-sidebar-foreground", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex h-10 items-center px-4 mb-6">
                        <div className="h-8 w-8 mr-2 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Camera className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-lg font-bold tracking-tight text-sidebar-foreground">
                            EventFoto <span className="text-brand">OS</span>
                        </h2>
                    </div>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <Button
                                key={item.href}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-md hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className={cn("mr-2 h-4 w-4", pathname === item.href ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50")} />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
