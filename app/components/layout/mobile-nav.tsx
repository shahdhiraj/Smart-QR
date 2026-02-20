"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/app/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { Sidebar } from "@/app/components/layout/sidebar"
import { useState } from "react"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                {/* Reusing Sidebar internal logic or structure would be good, 
             but Sidebar component has fixed height/border which we might not want directly in Sheet.
             For now, let's wrap Sidebar and override styles if needed or just render it. */ }
                <div className="h-full py-4">
                    <Sidebar className="border-none h-full" />
                </div>
            </SheetContent>
        </Sheet>
    )
}
