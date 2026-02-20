import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"

interface ExperienceSettingsProps {
    data: any
    updateData: (data: any) => void
}

export function ExperienceSettings({ data, updateData }: ExperienceSettingsProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Guest Uploads</Label>
                    <p className="text-sm text-muted-foreground">
                        Allow guests to upload their own photos via QR code.
                    </p>
                </div>
                <Switch
                    checked={data.allowGuestUploads !== false}
                    onCheckedChange={(checked: boolean) =>
                        updateData({ allowGuestUploads: checked })
                    }
                />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Face Match (AI)</Label>
                    <p className="text-sm text-muted-foreground">
                        Enable AI facial recognition for guests to find their photos.
                    </p>
                </div>
                <Switch
                    checked={data.enableFaceMatch !== false}
                    onCheckedChange={(checked: boolean) =>
                        updateData({ enableFaceMatch: checked })
                    }
                />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Watermark Photos</Label>
                    <p className="text-sm text-muted-foreground">
                        Apply your logo to all downloaded images.
                    </p>
                </div>
                <Switch
                    checked={data.enableWatermark || false}
                    onCheckedChange={(checked: boolean) =>
                        updateData({ enableWatermark: checked })
                    }
                />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Private Gallery</Label>
                    <p className="text-sm text-muted-foreground">
                        Require a PIN code to access the gallery.
                    </p>
                </div>
                <Switch
                    checked={data.isPrivate || false}
                    onCheckedChange={(checked: boolean) =>
                        updateData({ isPrivate: checked })
                    }
                />
            </div>
        </div>
    )
}
