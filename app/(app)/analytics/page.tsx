"use client"

import { SpendingByCategory, SpendingTrend } from "@/components/analytics-charts"

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6 pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-jersey font-normal tracking-wide">Analytics</h1>
                <p className="text-muted-foreground">Insights into your spending habits.</p>
            </div>

            <div className="flex flex-col gap-6">
                <SpendingTrend />
                <SpendingByCategory />
            </div>
        </div>
    )
}
