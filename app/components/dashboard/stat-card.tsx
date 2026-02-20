import { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

interface StatCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: {
        value: number
        label: string
        positive?: boolean
    }
}

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: StatCardProps) {
    return (
        <Card className="overflow-hidden border-border/50 bg-background/50 backdrop-blur-xl hover:bg-background/80 transition-all duration-300 hover:shadow-lg group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        {trend && (
                            <span
                                className={
                                    trend.positive === true
                                        ? "text-emerald-600 dark:text-emerald-400 flex items-center bg-emerald-100/50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-md font-medium"
                                        : trend.positive === false
                                            ? "text-red-600 dark:text-red-400 flex items-center bg-red-100/50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-md font-medium"
                                            : ""
                                }
                            >
                                {trend.value > 0 ? "+" : ""}
                                {trend.value}%
                            </span>
                        )}{" "}
                        <span className="opacity-80">
                            {trend?.label} {description}
                        </span>
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
