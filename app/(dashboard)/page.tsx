"use client"

import {
  Activity,
  Calendar,
  CreditCard,
  HardDrive,
  Users,
  Plus,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"

import { AISuggestions } from "@/app/components/dashboard/ai-suggestions"
import { RecentActivity } from "@/app/components/dashboard/recent-activity"
import { StatCard } from "@/app/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
            Welcome back!
          </h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your events today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>
      </div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <StatCard
            title="Total Events"
            value="12"
            icon={Calendar}
            trend={{ value: 12, label: "from last month", positive: true }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Active Guests"
            value="2,350"
            icon={Users}
            trend={{ value: 15, label: "from last month", positive: true }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Storage Used"
            value="45.2 GB"
            icon={HardDrive}
            description="of 100 GB (45%)"
            trend={{ value: 5, label: "increase", positive: false }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="WhatsApp Credits"
            value="1,200"
            icon={CreditCard}
            description="Est. 4 events remaining"
          />
        </motion.div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="col-span-4 space-y-6">
          {/* Main Chart Area */}
          <Card className="h-[400px] border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Event Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
                <div className="text-center">
                  <Activity className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>Activity Chart Placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-3 space-y-6">
          <AISuggestions />

          <Card className="border-border/50 bg-gradient-to-br from-background/50 to-primary/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start hover:bg-primary/5 hover:border-primary/20 transition-all">Create New Event</Button>
              <Button variant="outline" className="justify-start hover:bg-primary/5 hover:border-primary/20 transition-all">Top Up WhatsApp Credits</Button>
              <Button variant="outline" className="justify-start hover:bg-primary/5 hover:border-primary/20 transition-all">Configure Branding</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
