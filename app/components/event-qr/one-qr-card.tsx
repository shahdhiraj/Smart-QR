"use client"

import * as React from "react"
import { Monitor, Smartphone, Share2, Download, PenLine, ChevronLeft, ChevronRight, Check } from "lucide-react"
import QRCode from "react-qr-code"
import { toPng } from "html-to-image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { cn } from "@/lib/utils"

interface OneQRCardProps {
    event?: {
        id: string
        title: string
        date: string
        imageUrl?: string
    }
}

export function OneQRCard({ event }: OneQRCardProps) {
    const [selectedColor, setSelectedColor] = React.useState("pink")
    const [headerImage, setHeaderImage] = React.useState<string | null>(null)
    const qrRef = React.useRef<HTMLDivElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Default fallback data if no event is provided
    const eventData = event || {
        id: "preview",
        title: "Mike & Julie's Wedding",
        date: "October 24, 2024",
        imageUrl: ""
    }

    const qrUrl = `https://eventfoto.os/qr/${eventData.id}`

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setHeaderImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const triggerImageUpload = () => {
        fileInputRef.current?.click()
    }

    const downloadQR = React.useCallback(() => {
        if (qrRef.current === null) {
            return
        }

        toPng(qrRef.current, { cacheBust: true, backgroundColor: '#ffffff' })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `event-qr-${eventData.id}.png`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.error("Failed to download QR code", err)
            })
    }, [qrRef, eventData.id])

    const shareQR = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: eventData.title,
                    text: `Join ${eventData.title} and upload your photos!`,
                    url: qrUrl,
                })
            } else {
                await navigator.clipboard.writeText(qrUrl)
                alert("Link copied to clipboard!")
            }
        } catch (error) {
            console.error("Error sharing:", error)
        }
    }

    // Define theme styles
    const themeStyles = {
        pink: {
            bg: "bg-pink-50",
            accent: "bg-pink-500",
            button: "bg-pink-500 hover:bg-pink-600 text-white",
            notch: "bg-black"
        },
        black: {
            bg: "bg-zinc-900",
            accent: "bg-zinc-800",
            button: "bg-white hover:bg-zinc-200 text-black",
            notch: "bg-black"
        },
        gray: {
            bg: "bg-slate-100",
            accent: "bg-slate-500",
            button: "bg-slate-700 hover:bg-slate-800 text-white",
            notch: "bg-black"
        },
        white: {
            bg: "bg-white",
            accent: "bg-gray-100",
            button: "bg-black hover:bg-gray-800 text-white",
            notch: "bg-black"
        }
    }

    const currentTheme = themeStyles[selectedColor as keyof typeof themeStyles]

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl">Current Template</CardTitle>
                        <CardDescription>Customize how your event looks directly on guest phones.</CardDescription>
                    </div>
                    <div className="flex items-center bg-muted rounded-full p-1 border w-fit">
                        <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 text-muted-foreground">
                            <Monitor className="h-4 w-4 mr-2" /> Web
                        </Button>
                        <Button variant="secondary" size="sm" className="rounded-full h-8 px-3 shadow-sm bg-background text-foreground hover:bg-background/90">
                            <Smartphone className="h-4 w-4 mr-2" /> Mobile
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid lg:grid-cols-2 gap-12 items-start pt-6">
                    {/* Left: Phone Preview */}
                    <div className="flex justify-center">
                        <div className="relative flex justify-center py-8 px-12 bg-muted/30 rounded-3xl border border-dashed w-full max-w-md">
                            {/* Navigation Arrows (Visual only) */}
                            <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background shadow-sm border hover:bg-muted z-10 hidden sm:flex">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background shadow-sm border hover:bg-muted z-10 hidden sm:flex">
                                <ChevronRight className="h-5 w-5" />
                            </Button>

                            {/* Phone Device */}
                            <div className="relative w-[280px] h-[580px] bg-background rounded-[3rem] border-[8px] border-slate-900 shadow-xl overflow-hidden ring-1 ring-black/5">
                                {/* Dynamic Island / Notch */}
                                <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 z-20 flex justify-center">
                                    <div className="w-24 h-5 bg-black rounded-b-xl" />
                                </div>

                                {/* Screen Content */}
                                <div className={cn("h-full w-full overflow-y-auto pt-10 px-4 pb-4 scrollbar-hide transition-colors duration-300", currentTheme.bg)}>
                                    {/* Header Image Area */}
                                    <div
                                        onClick={triggerImageUpload}
                                        className="w-full aspect-[4/3] bg-slate-200/50 rounded-2xl mb-4 overflow-hidden relative cursor-pointer group hover:opacity-90 transition-opacity"
                                    >
                                        {headerImage ? (
                                            <img src={headerImage} alt="Header" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                                                <span className="text-xs">Tap to upload image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PenLine className="text-white h-6 w-6" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>

                                    {/* Event Text Placeholders */}
                                    <div className="space-y-2 mb-6 text-center px-1">
                                        <h3 className={cn("font-bold text-lg leading-tight", selectedColor === 'black' ? "text-white" : "text-slate-900")}>
                                            {eventData.title}
                                        </h3>
                                        <p className={cn("text-xs opacity-70", selectedColor === 'black' ? "text-slate-300" : "text-slate-500")}>
                                            {eventData.date}
                                        </p>
                                    </div>

                                    {/* Gallery Grid Mockup */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className={cn("aspect-square rounded-xl shadow-sm border p-1", selectedColor === 'black' ? "bg-zinc-800 border-zinc-700" : "bg-white border-slate-100")}>
                                                <div className={cn("w-full h-full rounded-lg opacity-50", currentTheme.accent)} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Upload Button Mockup */}
                                    <div className="mt-6 flex justify-center">
                                        <div className={cn("h-12 w-12 rounded-full flex items-center justify-center shadow-lg", currentTheme.button)}>
                                            <span className="text-xl">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Controls & QR */}
                    <div className="flex flex-col gap-8 h-full justify-center">
                        {/* QR Code Identification */}
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div ref={qrRef} className="p-4 bg-white rounded-2xl border shadow-sm flex items-center justify-center relative group">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 z-0">
                                    {/* Hidden container for capture that includes the image if needed, but for now capturing the QR div is enough */}
                                </div>
                                <QRCode
                                    value={qrUrl}
                                    size={160}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>

                            <div className="space-y-4 w-full sm:w-auto flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div>
                                    <h3 className="font-semibold text-lg">Event QR Code</h3>
                                    <p className="text-sm text-muted-foreground break-all">{qrUrl}</p>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <Button onClick={downloadQR} className="flex-1 bg-amber-500 hover:bg-amber-600 text-black border-amber-600 font-medium rounded-full shadow-sm">
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </Button>
                                    <Button onClick={shareQR} variant="outline" className="flex-1 rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground">
                                        <Share2 className="mr-2 h-4 w-4" /> Share
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-border w-full" />

                        {/* Customization Section */}
                        <div className="space-y-6">
                            {/* Color Theme */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Color Theme</Label>
                                <div className="flex items-center gap-3">
                                    {[
                                        { id: "pink", color: "bg-pink-500 ring-pink-500", label: "Pink" },
                                        { id: "black", color: "bg-slate-900 ring-slate-900", label: "Dark" },
                                        { id: "gray", color: "bg-slate-500 ring-slate-500", label: "Slate" },
                                        { id: "white", color: "bg-white border border-slate-200 ring-slate-200", label: "Light" }
                                    ].map((theme) => (
                                        <button
                                            key={theme.id}
                                            onClick={() => setSelectedColor(theme.id)}
                                            className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
                                                theme.color,
                                                selectedColor === theme.id ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-90 hover:opacity-100"
                                            )}
                                            aria-label={`Select ${theme.label} theme`}
                                        >
                                            {selectedColor === theme.id && (
                                                <Check className={cn("h-5 w-5", theme.id === "white" ? "text-slate-900" : "text-white")} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Customize Template</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="default" onClick={triggerImageUpload} className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                                        Upload Image
                                    </Button>
                                    <Button variant="outline" className="rounded-full">
                                        Fill Content
                                    </Button>
                                    <Button variant="outline" className="rounded-full">
                                        Typography
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 border-t p-4 flex justify-center sm:justify-between items-center text-sm text-muted-foreground">
                <span className="hidden sm:inline">Last updated: Just now</span>
                <div className="flex items-center gap-2">
                    <span>Preview Mode</span>
                </div>
            </CardFooter>
        </Card>
    )
}
