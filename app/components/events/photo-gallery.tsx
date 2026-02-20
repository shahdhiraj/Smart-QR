"use client"

import * as React from "react"
import { Download, Maximize2, Heart, Upload, Play, Loader2, Grid, CheckCircle2, Circle, X, Save, Image as ImageIcon, Sparkles, Plus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { cn } from "@/lib/utils"
import { CollageGenerator } from "./collage-generator"
import { Badge } from "@/app/components/ui/badge"

interface Photo {
    id: string
    url: string
    thumbnail: string
    photographer: string
    likes: number
    type: 'image' | 'video'
    duration?: string
}

export function PhotoGallery({ eventId, enableUpload = true }: { eventId: string, enableUpload?: boolean }) {
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [loading, setLoading] = React.useState(true)
    const [uploading, setUploading] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Collage Selection State
    const [isSelectionMode, setIsSelectionMode] = React.useState(false)
    const [selectedPhotoIds, setSelectedPhotoIds] = React.useState<Set<string>>(new Set())
    const [showCollageGenerator, setShowCollageGenerator] = React.useState(false)

    // Drag and Drop & Pending Uploads State
    const [isDragging, setIsDragging] = React.useState(false)
    const [pendingUploads, setPendingUploads] = React.useState<File[]>([])

    React.useEffect(() => {
        // Simulate network delay and fetch
        const timer = setTimeout(() => {
            const mockPhotos: Photo[] = Array.from({ length: 12 }).map((_, i) => ({
                id: `media-${i}`,
                url: `https://picsum.photos/seed/${eventId}-${i}/1200/900`,
                thumbnail: `https://picsum.photos/seed/${eventId}-${i}/400/300`,
                photographer: `Guest ${i + 1}`,
                likes: Math.floor(Math.random() * 50) + 1,
                type: i % 4 === 0 ? 'video' : 'image', // Every 4th item is a video
                duration: i % 4 === 0 ? '0:45' : undefined
            }))
            setPhotos(mockPhotos)
            setLoading(false)
        }, 1200)

        return () => clearTimeout(timer)
    }, [eventId])

    // --- Drag & Drop Handlers ---
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (enableUpload && !isDragging) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (!enableUpload) return

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        )

        if (files.length > 0) {
            setPendingUploads(prev => [...prev, ...files])
        }
    }

    // --- Upload Handlers ---
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const newFiles = Array.from(files)
        setPendingUploads(prev => [...prev, ...newFiles])

        // Reset input so same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removePendingUpload = (index: number) => {
        setPendingUploads(prev => prev.filter((_, i) => i !== index))
    }

    const savePendingUploads = () => {
        if (pendingUploads.length === 0) return

        setUploading(true)
        // Simulate upload delay
        setTimeout(() => {
            const newPhotos: Photo[] = pendingUploads.map((file, i) => {
                const isVideo = file.type.startsWith('video/')
                return {
                    id: `upload-${Date.now()}-${i}`,
                    url: URL.createObjectURL(file), // Create local preview URL
                    thumbnail: URL.createObjectURL(file), // Using object URL as thumbnail for now
                    photographer: 'Organizer (You)',
                    likes: 0,
                    type: isVideo ? 'video' : 'image',
                    duration: isVideo ? '0:00' : undefined
                }
            })

            setPhotos(prev => [...newPhotos, ...prev])
            setPendingUploads([])
            setUploading(false)
        }, 1500)
    }

    // --- Selection Handlers ---
    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedPhotoIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            // Soft limit for collage
            if (newSelected.size >= 4) {
                // Could show toast here
            }
            newSelected.add(id)
        }
        setSelectedPhotoIds(newSelected)
    }

    const toggleSelectionMode = () => {
        if (isSelectionMode) {
            setIsSelectionMode(false)
            setSelectedPhotoIds(new Set())
        } else {
            setIsSelectionMode(true)
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="aspect-[4/5] w-full rounded-2xl bg-muted/50 animate-pulse" />
                        <div className="h-4 w-2/3 bg-muted/50 rounded-full animate-pulse" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            className={cn(
                "relative space-y-8 min-h-[500px] transition-all duration-300 rounded-3xl p-6",
                isDragging && "bg-blue-50/30 ring-2 ring-dashed ring-blue-400 scale-[0.99]"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Drag Overlay Message */}
            <div className={cn(
                "absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md rounded-3xl transition-opacity duration-300 pointer-events-none",
                isDragging ? "opacity-100" : "opacity-0"
            )}>
                <div className="text-center space-y-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                    <div className="h-24 w-24 bg-blue-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Drop files to upload</h3>
                    <p className="text-muted-foreground">Instantly add photos and videos to the gallery</p>
                </div>
            </div>

            {/* Header / Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sticky top-0 bg-background/95 backdrop-blur-sm z-40 py-2 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold tracking-tight">Gallery</h3>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                        {photos.length} Captured
                    </Badge>
                </div>

                <div className="flex items-center gap-3">
                    {/* Collage Action */}
                    {isSelectionMode ? (
                        <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-full pr-4 animate-in slide-in-from-right-4 fade-in duration-300">
                            <span className="text-sm font-medium ml-3 mr-2 bg-background px-2 py-0.5 rounded-full shadow-sm">
                                {selectedPhotoIds.size}
                            </span>
                            <Button
                                variant="default"
                                size="sm"
                                className="rounded-full"
                                disabled={selectedPhotoIds.size === 0}
                                onClick={() => setShowCollageGenerator(true)}
                            >
                                <Sparkles className="mr-2 h-3.5 w-3.5 fill-current" /> Auto-Collage
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-background" onClick={toggleSelectionMode}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" size="sm" className="rounded-full border-dashed" onClick={toggleSelectionMode} disabled={photos.length === 0}>
                            <Grid className="mr-2 h-4 w-4" /> Create Collage
                        </Button>
                    )}

                    {/* Upload Action */}
                    {!isSelectionMode && enableUpload && (
                        <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileSelect}
                            />
                            <Button size="sm" className="rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" onClick={() => fileInputRef.current?.click()}>
                                <Plus className="mr-2 h-4 w-4" /> Add Media
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Pending Uploads Bar */}
            {pendingUploads.length > 0 && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-blue-900 flex items-center">
                            <Upload className="mr-2 h-4 w-4 text-blue-600" />
                            Ready to Upload ({pendingUploads.length})
                        </h4>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-100" onClick={() => setPendingUploads([])}>
                                Discard
                            </Button>
                            <Button size="sm" onClick={savePendingUploads} disabled={uploading}>
                                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save to Gallery
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-1">
                        {pendingUploads.map((file, i) => (
                            <div key={i} className="relative group shrink-0 w-28 h-28 rounded-xl overflow-hidden border-2 border-white shadow-md transition-transform hover:scale-105">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-full object-cover"
                                        alt="preview"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-black/5">
                                        <Play className="h-8 w-8 text-black/50" />
                                    </div>
                                )}
                                <button
                                    onClick={() => removePendingUpload(i)}
                                    className="absolute top-1 right-1 bg-black/40 hover:bg-destructive text-white p-1 rounded-full transition-colors backdrop-blur-sm"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] p-2 pt-4 truncate font-medium">
                                    {file.name}
                                </div>
                            </div>
                        ))}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="shrink-0 w-28 h-28 rounded-xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-400 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all gap-2"
                        >
                            <Upload className="h-6 w-6" />
                            <span className="text-xs font-medium">Add More</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            {photos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-muted rounded-3xl bg-muted/5 group hover:bg-muted/10 transition-colors">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/70" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">No media yet</h3>
                    <p className="text-muted-foreground max-w-sm mb-6 px-4">
                        The gallery is waiting for its first memory. Upload a photo or video to get started.
                    </p>
                    {enableUpload && (
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-full" onClick={() => fileInputRef.current?.click()}>
                                Select Files
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {photos.map((photo, index) => {
                        const isSelected = selectedPhotoIds.has(photo.id)
                        return (
                            <div
                                key={photo.id}
                                className={cn(
                                    "group relative break-inside-avoid transition-all duration-300 rounded-2xl overflow-hidden mb-4",
                                    isSelectionMode && "cursor-pointer transform hover:scale-[0.98]",
                                    isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-background z-10"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => isSelectionMode && toggleSelection(photo.id)}
                            >
                                <div className="relative">
                                    <div className="relative">
                                        {photo.type === 'video' ? (
                                            <div className="w-full bg-black flex items-center justify-center relative aspect-[4/5]">
                                                {/* In a real app we'd use a thumbnail or video tag with poster */}
                                                <div className="absolute inset-0 opacity-80">
                                                    <img
                                                        src={photo.thumbnail}
                                                        className="h-full w-full object-cover"
                                                        alt="Video thumbnail"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="z-10 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:scale-110 transition-transform">
                                                    <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                                                </div>
                                                <div className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/10">
                                                    {photo.duration}
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={photo.thumbnail}
                                                alt={`Photo by ${photo.photographer}`}
                                                className={cn(
                                                    "w-full h-auto object-cover transition-transform duration-700",
                                                    !isSelectionMode && "group-hover:scale-110"
                                                )}
                                                loading="lazy"
                                            />
                                        )}

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Selection Overlay */}
                                        {isSelectionMode && (
                                            <div className={cn(
                                                "absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200",
                                                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                            )}>
                                                {isSelected ? (
                                                    <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-xl animate-in zoom-in">
                                                        <CheckCircle2 className="h-8 w-8" />
                                                    </div>
                                                ) : (
                                                    <div className="bg-white/20 text-white rounded-full p-2 border-2 border-white/50 backdrop-blur-md">
                                                        <Circle className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions Overlay (Hidden in Selection Mode) */}
                                    {!isSelectionMode && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 pointer-events-none">
                                            <div className="flex justify-end gap-2 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm">
                                                    <Maximize2 className="h-4 w-4 text-foreground/80" />
                                                </Button>
                                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm">
                                                    <Download className="h-4 w-4 text-foreground/80" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white/20">
                                                        {photo.photographer.charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-medium text-white/90 drop-shadow-sm">{photo.photographer}</span>
                                                </div>
                                                <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                                    <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> {photo.likes}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <CollageGenerator
                photos={photos.filter(p => selectedPhotoIds.has(p.id))}
                open={showCollageGenerator}
                onOpenChange={setShowCollageGenerator}
            />
        </div>
    )
}
