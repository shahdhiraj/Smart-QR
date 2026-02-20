import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Card } from "@/app/components/ui/card"

export function MessagePreview() {
    return (
        <Card className="max-w-sm overflow-hidden border bg-[#EFEAE2] p-0 shadow-lg dark:bg-[#0b141a]">
            <div className="bg-[#008069] p-3 text-white">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/logo.png" />
                        <AvatarFallback>EO</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">EventFoto OS</div>
                </div>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex gap-2">
                    <div className="rounded-lg rounded-tl-none bg-white p-2 text-sm shadow-sm dark:bg-[#202c33] dark:text-[#e9edef]">
                        <p>Hi John! 👋</p>
                        <p className="mt-1">
                            Your photos from <strong>Mike & Julie's Wedding</strong> are ready!
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">10:42 AM</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="rounded-lg rounded-tl-none bg-white p-2 text-sm shadow-sm dark:bg-[#202c33] dark:text-[#e9edef]">
                        <div className="mb-2 relative aspect-video w-48 overflow-hidden rounded-md bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                                [Photo Preview]
                            </div>
                        </div>
                        <p>Here is a preview of your moments.</p>
                        <p className="mt-1 text-blue-500 underline cursor-pointer">
                            eventfoto.os/g/xyz123
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">10:42 AM</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
