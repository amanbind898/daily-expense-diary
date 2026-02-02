"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useExpenses } from "@/hooks/use-expenses"
import { CATEGORIES, Category } from "@/types/expense"

interface AddExpenseDrawerProps {
    defaultDate?: Date
}

export function AddExpenseDrawer({ defaultDate = new Date() }: AddExpenseDrawerProps) {
    const [open, setOpen] = React.useState(false)
    const [amount, setAmount] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [category, setCategory] = React.useState<Category>("Food")
    const { addExpense } = useExpenses()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || !description) return

        // Create a date object with the selected date's YMD but current time
        // This ensures the sorting order (by time) works even for past dates added now
        const now = new Date();
        const expenseDate = new Date(defaultDate);
        expenseDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

        addExpense({
            amount: parseFloat(amount),
            description,
            category,
            date: expenseDate.toISOString(),
        })

        // Reset and close
        setAmount("")
        setDescription("")
        setCategory("Food")
        setOpen(false)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-xl bg-foreground text-background hover:scale-105 transition-transform fixed bottom-20 right-6 z-[60] sm:bottom-20 sm:right-8 border-2 border-background"
                >
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Add Expense</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add Expense</DrawerTitle>
                        <DrawerDescription>Track your daily spending.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-muted-foreground ml-1">
                                Amount
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-8 text-2xl font-bold h-16 border-2 border-primary/20 focus-visible:border-primary/50 text-center"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-muted-foreground ml-1">Description</Label>
                            <Input
                                id="description"
                                placeholder="What did you buy?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-muted-foreground ml-1">Category</Label>
                            <select
                                id="category"
                                className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <DrawerFooter className="px-0 pt-4">
                            <Button type="submit" size="lg" className="w-full text-lg h-12">
                                Add Expense
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" size="lg" className="w-full">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
