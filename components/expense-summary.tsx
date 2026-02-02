"use client"

import { useExpenses } from "@/hooks/use-expenses"
import { Card } from "@/components/ui/card"
import { TrendingUp, Wallet } from "lucide-react"

import { isSameDay, isSameMonth, format } from "date-fns"

interface ExpenseSummaryProps {
    date?: Date
}

export function ExpenseSummary({ date = new Date() }: ExpenseSummaryProps) {
    const { expenses } = useExpenses()

    // Calculate totals based on the selected date
    const dailyTotal = expenses
        .filter(e => isSameDay(new Date(e.date), date))
        .reduce((sum, e) => sum + e.amount, 0)

    const monthlyTotal = expenses
        .filter(e => isSameMonth(new Date(e.date), date))
        .reduce((sum, e) => sum + e.amount, 0)

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-primary text-primary-foreground border-none">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 opacity-80">
                        <Wallet className="h-4 w-4" />
                        <span className="text-xs font-medium">{format(date, "MMM d")} Spent</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold">₹{dailyTotal.toLocaleString()}</span>
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-card text-card-foreground border">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs font-medium">{format(date, "MMMM")} Total</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold">₹{monthlyTotal.toLocaleString()}</span>
                    </div>
                </div>
            </Card>

        </div>
    )
}
