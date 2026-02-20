import { Calendar, MoreHorizontal, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/app/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

interface EventCardProps {
    id: string
    title: string
    date: string
    status: "Draft" | "Live" | "Expired"
    guests: number
    imageUrl: string
}

export function EventCard({
    id,
    title,
    date,
    status,
    guests,
    imageUrl,
}: EventCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="aspect-video relative w-full overflow-hidden">
                {/* Using placeholder for now if no real image */}
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center text-muted-foreground">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={title} fill className="object-cover" />
                    ) : (
                        "No Image"
                    )}
                </div>
                <div className="absolute right-2 top-2">
                    <Badge
                        variant={
                            status === "Live"
                                ? "default"
                                : status === "Draft"
                                    ? "secondary"
                                    : "destructive"
                        }
                    >
                        {status}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4">
                <div className="flex items-start justify-between space-y-0">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">
                            <Link href={`/events/${id}`} className="hover:underline">
                                {title}
                            </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {date}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mt-2 -mr-2 h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    {guests} Guests
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/events/${id}`}>Manage</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
