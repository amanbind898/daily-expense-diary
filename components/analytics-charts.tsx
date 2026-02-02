"use client"

import { useExpenses } from "@/hooks/use-expenses"
import { Card } from "@/components/ui/card"
import { CATEGORIES } from "@/types/expense"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { format } from "date-fns"

export function SpendingByCategory() {
    const { expenses } = useExpenses()

    if (expenses.length === 0) return (
        <Card className="p-8 flex items-center justify-center text-muted-foreground">
            No data to display
        </Card>
    )

    const data = CATEGORIES.map(cat => {
        const amount = expenses
            .filter(e => e.category === cat.value)
            .reduce((sum, e) => sum + e.amount, 0);
        return { name: cat.value, value: amount, color: cat.color };
    }).filter(d => d.value > 0);

    return (
        <Card className="p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold w-full text-left mb-4">By Category</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `₹${value}`}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--popover))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--popover-foreground))'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
                {data.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full" style={{ background: d.color }}></span>
                        <span>{d.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export function SpendingTrend() {
    // Mock trend for now as we don't have historical data gen logic fully
    // In real app, group expenses by day for last 7 days
    const { expenses } = useExpenses()

    // Simple verification aggregation (Last 5 transactions as "days" for demo if not enough date spread)
    // Real logic: Group by date (Last 7 days)

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split('T')[0];

        const amount = expenses
            .filter(e => e.date.startsWith(dateStr))
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            date: format(d, 'EEE'), // Mon, Tue...
            amount
        }
    });

    return (
        <Card className="p-4">
            <h3 className="text-lg font-semibold w-full text-left mb-4">This Week</h3>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={last7Days}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                        />
                        <Tooltip
                            cursor={{ fill: 'var(--muted)/0.2' }}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--popover))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--popover-foreground))'
                            }}
                        />
                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
