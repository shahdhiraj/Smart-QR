import { Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

export function AISuggestions() {
    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    AI Insights
                </CardTitle>
                <CardDescription>
                    Actionable suggestions to improve event performance.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-start gap-4 rounded-lg border bg-background p-3 shadow-sm">
                    <div className="flex-1">
                        <p className="text-sm font-medium">Guest engagement is low on "Summer Gala"</p>
                        <p className="text-xs text-muted-foreground mt-1">Try enabling "Face Match" to encourage more interaction.</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                </div>
                <div className="flex items-start gap-4 rounded-lg border bg-background p-3 shadow-sm">
                    <div className="flex-1">
                        <p className="text-sm font-medium">Potential revenue: $450</p>
                        <p className="text-xs text-muted-foreground mt-1">Enable photo selling for "Wedding: Mike & Julie".</p>
                    </div>
                    <Button size="sm" variant="outline">Setup</Button>
                </div>
            </CardContent>
        </Card>
    )
}
