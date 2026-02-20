"use client"

import * as React from "react"
import { Loader2, X, Download, LayoutTemplate, Sparkles } from "lucide-react"
import { toPng } from "html-to-image"

import { Button } from "@/app/components/ui/button"
import { cn } from "@/lib/utils"

interface Photo {
    id: string
    url: string
    thumbnail: string
    photographer: string
    type: 'image' | 'video'
}

interface CollageGeneratorProps {
    photos: Photo[]
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CollageGenerator({ photos, open, onOpenChange }: CollageGeneratorProps) {
    const collageRef = React.useRef<HTMLDivElement>(null)
    const [generating, setGenerating] = React.useState(false)

    // Close on escape key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onOpenChange(false)
        }
        if (open) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [open, onOpenChange])

    // Prevent scrolling when open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [open])

    const downloadCollage = async () => {
        if (!collageRef.current) return

        setGenerating(true)
        try {
            // Wait for images to load if needed, but they should be loaded in preview
            const dataUrl = await toPng(collageRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                pixelRatio: 2 // High quality
            })

            const link = document.createElement('a')
            link.download = `event-collage-${Date.now()}.png`
            link.href = dataUrl
            link.click()

            // Optional: Close after download
            onOpenChange(false)
        } catch (err) {
            console.error("Failed to generate collage", err)
        } finally {
            setGenerating(false)
        }
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in-0 duration-200">
            {/* Modal Content */}
            <div className="bg-background/95 border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 slide-in-from-bottom-2">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight">Create Memory Collage</h2>
                            <p className="text-sm text-muted-foreground">Turn your favorite moments into a shareable keepsake.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="rounded-full p-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-muted/10">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        {/* Capture Area */}

                        <div
                            ref={collageRef}
                            className="bg-white p-4 shadow-xl ring-1 ring-black/5 w-full max-w-[600px] aspect-square flex flex-col transition-all"
                        >
                            <div className="flex-1 grid gap-3 overflow-hidden"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: photos.length === 1 ? '1fr' : photos.length === 2 ? '1fr 1fr' : photos.length === 3 ? '1fr 1fr' : 'repeat(2, 1fr)',
                                    gridTemplateRows: photos.length <= 2 ? '1fr' : 'repeat(2, 1fr)'
                                }}>
                                {photos.slice(0, 4).map((photo, index) => {
                                    const isFirst = index === 0
                                    const style: React.CSSProperties = {}

                                    // Layout: 3 photos -> First takes full left col
                                    if (photos.length === 3 && isFirst) {
                                        style.gridRow = 'span 2'
                                    }

                                    return (
                                        <div key={photo.id} className="relative overflow-hidden group">
                                            <img
                                                src={photo.thumbnail}
                                                alt="Collage item"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-5 flex justify-between items-end px-2 pb-1">
                                <div>
                                    <h3 className="font-bold text-2xl leading-tight text-black tracking-tight">Event Memories</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1.5 text-black/80">
                                        <div className="h-4 w-4 rounded-full bg-black/10 flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-full bg-black" />
                                        </div>
                                        <p className="text-xs font-semibold tracking-wide uppercase">EventFoto.OS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-muted-foreground/80 flex items-center gap-2">
                            <LayoutTemplate className="h-4 w-4" />
                            Layout auto-generated based on {photos.length} selected photos
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-background flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="text-sm text-muted-foreground flex items-center">
                        {photos.length > 4 && (
                            <span className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                <span className="h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse" />
                                Only first 4 photos used
                            </span>
                        )}
                    </div>
                    <div className="flex gap-3 justify-end w-full sm:w-auto">
                        <Button variant="ghost" className="rounded-full px-6" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button
                            onClick={downloadCollage}
                            disabled={generating}
                            className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Render...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Collage
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
