import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

export function RecentActivity() {
    const activities = [
        {
            user: "Sarah Johnson",
            action: "uploaded 50 photos to",
            target: "Wedding: Mike & Julie",
            time: "2 mins ago",
            avatar: "/avatars/01.png",
            initials: "SJ",
        },
        {
            user: "System",
            action: "generated AI summary for",
            target: "Corporate Event 2024",
            time: "15 mins ago",
            avatar: "",
            initials: "AI",
        },
        {
            user: "Guest #482",
            action: "viewed gallery",
            target: "Birthday Bash",
            time: "1 hour ago",
            avatar: "",
            initials: "G",
        },
        {
            user: "David Lee",
            action: "purchased 3 photos from",
            target: "Graduation Party",
            time: "3 hours ago",
            avatar: "/avatars/02.png",
            initials: "DL",
        },
    ]

    return (
        <div className="space-y-8">
            {activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={activity.avatar} alt="Avatar" />
                        <AvatarFallback>{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            <span className="font-semibold">{activity.user}</span>{" "}
                            {activity.action} <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
