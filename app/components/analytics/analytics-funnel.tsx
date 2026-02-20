"use client"

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts"

const data = [
    { name: "QR Scans", value: 1200 },
    { name: "Gallery Views", value: 980 },
    { name: "Photo Clicks", value: 650 },
    { name: "Downloads", value: 420 },
]

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'];

export function AnalyticsFunnel() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart layout="vertical" data={data} margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
