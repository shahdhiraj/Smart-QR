import { Calendar, MapPin, Users, CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

interface PreviewPublishProps {
    data: any
}

export function PreviewPublish({ data }: PreviewPublishProps) {
    return (
        <div className="space-y-6">
            <div className="rounded-md bg-muted/50 p-4 text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Almost there!</h3>
                <p className="text-sm text-muted-foreground">
                    Review your event details before publishing.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{data.eventName || "Untitled Event"}</CardTitle>
                        <Badge>Draft Preview</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{data.date || "Date not set"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{data.location || "Location not set"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{data.expectedGuests || 0} Expected Guests</span>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2 text-sm">Experience Settings</h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <span className={data.allowGuestUploads !== false ? "text-emerald-500" : "text-muted-foreground"}>●</span> Guest Uploads
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={data.enableFaceMatch !== false ? "text-emerald-500" : "text-muted-foreground"}>●</span> AI Face Match
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={data.enableWatermark ? "text-emerald-500" : "text-muted-foreground"}>●</span> Watermark
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={data.isPrivate ? "text-emerald-500" : "text-muted-foreground"}>●</span> Private Gallery
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
