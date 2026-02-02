"use client"

import { useState, useEffect, useCallback } from "react"
import { Expense } from "@/types/expense"

const STORAGE_KEY = "daily-expense-diary-data"

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [loading, setLoading] = useState(true)

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                setExpenses(JSON.parse(stored))
            }
        } catch (error) {
            console.error("Failed to load expenses:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    // Save to local storage whenever expenses change
    const saveExpenses = useCallback((newExpenses: Expense[]) => {
        setExpenses(newExpenses)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses))
    }, [])

    const addExpense = useCallback((expense: Omit<Expense, "id" | "createdAt">) => {
        const newExpense: Expense = {
            ...expense,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        }
        saveExpenses([newExpense, ...expenses])
    }, [expenses, saveExpenses])

    const deleteExpense = useCallback((id: string) => {
        const newExpenses = expenses.filter((e) => e.id !== id)
        saveExpenses(newExpenses)
    }, [expenses, saveExpenses])

    const getExpensesByDate = useCallback((date: Date) => {
        const dateStr = date.toISOString().split("T")[0]
        return expenses.filter((e) => e.date.startsWith(dateStr))
    }, [expenses])

    const getTotalSpent = useCallback(() => {
        return expenses.reduce((sum, e) => sum + e.amount, 0);
    }, [expenses]);

    const getExpensesThisMonth = useCallback(() => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        return expenses.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });
    }, [expenses]);

    return {
        expenses,
        loading,
        addExpense,
        deleteExpense,
        getExpensesByDate,
        getTotalSpent,
        getExpensesThisMonth,
        importExpenses: saveExpenses
    }
}
