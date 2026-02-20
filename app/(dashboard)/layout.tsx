import { Sidebar } from "@/app/components/layout/sidebar"
import { TopBar } from "@/app/components/layout/top-bar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background md:flex-row">
            <Sidebar className="hidden w-64 md:block flex-shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground" />
            <div className="flex-1 flex flex-col min-w-0 bg-background">
                <TopBar />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    )
}
