"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    action?: {
        label: string
        onClick: () => void
    }
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <Card className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 border-dashed">
            <CardContent className="flex flex-col items-center gap-2 p-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-4">
                    {description}
                </p>
                {action && (
                    <Button onClick={action.onClick} variant="outline">
                        {action.label}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
