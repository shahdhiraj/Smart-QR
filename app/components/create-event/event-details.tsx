import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

interface EventDetailsProps {
    data: any
    updateData: (data: any) => void
}

export function EventDetails({ data, updateData }: EventDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                    id="eventName"
                    placeholder="e.g. Summer Gala 2024"
                    value={data.eventName || ""}
                    onChange={(e) => updateData({ eventName: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                    This will be visible to your guests.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                        id="date"
                        type="date"
                        value={data.date || ""}
                        onChange={(e) => updateData({ date: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        placeholder="City or Venue"
                        value={data.location || ""}
                        onChange={(e) => updateData({ location: e.target.value })}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="expectedGuests">Expected Guests</Label>
                <Input
                    id="expectedGuests"
                    type="number"
                    placeholder="e.g. 150"
                    value={data.expectedGuests || ""}
                    onChange={(e) => updateData({ expectedGuests: e.target.value })}
                />
            </div>
        </div>
    )
}
