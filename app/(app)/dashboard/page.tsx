"use client"

import * as React from "react"
import { AddExpenseDrawer } from "@/components/add-expense-drawer"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseSummary } from "@/components/expense-summary"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function DashboardPage() {
    const [date, setDate] = React.useState<Date>(new Date())

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 pb-2">
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(d) => d && setDate(d)}
                                initialFocus
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            />
                        </PopoverContent>
                    </Popover>
                    {(date.toDateString() !== new Date().toDateString()) && (
                        <Button variant="ghost" size="sm" onClick={() => setDate(new Date())} className="text-xs h-8 text-muted-foreground">
                            Reset to Today
                        </Button>
                    )}
                </div>

                <h1 className="text-4xl font-jersey font-normal tracking-wide mt-2">
                    {format(date, "d MMMM")} Overview
                </h1>
            </div>

            <ExpenseSummary date={date} />

            <div className="flex flex-col gap-2">
                <ExpenseList date={date} />
            </div>

            <AddExpenseDrawer defaultDate={date} />
        </div>
    )
}
