"use client"

import { useExpenses } from "@/hooks/use-expenses"
import { Card } from "@/components/ui/card"
import { CATEGORIES } from "@/types/expense"
import { isSameDay, format } from "date-fns"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExpenseListProps {
    date?: Date
}

export function ExpenseList({ date = new Date() }: ExpenseListProps) {
    const { expenses, deleteExpense } = useExpenses()

    const filteredExpenses = expenses.filter(expense =>
        isSameDay(new Date(expense.date), date)
    )

    if (filteredExpenses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p>No expenses for {format(date, "MMMM d")}.</p>
                <p className="text-sm">Tap the + button to add one.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4 pb-20">
            <h2 className="text-lg font-semibold tracking-tight">Transactions for {format(date, "MMM d")}</h2>
            {filteredExpenses.map((expense) => {
                const categoryColor = CATEGORIES.find(c => c.value === expense.category)?.color;
                return (
                    <Card key={expense.id} className="p-4 flex items-center justify-between transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                            <div
                                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                style={{ backgroundColor: categoryColor || 'gray' }}
                            >
                                {expense.category[0]}
                            </div>
                            <div>
                                <p className="font-medium leading-none">{expense.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-muted-foreground">{expense.category}</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">{format(new Date(expense.date), "MMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-primary">
                                 ₹{expense.amount.toFixed(0)}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => deleteExpense(expense.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
