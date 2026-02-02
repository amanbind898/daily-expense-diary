"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Moon, Sun, Download, Trash2, Smartphone } from "lucide-react"
import { useExpenses } from "@/hooks/use-expenses"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()
    const { expenses } = useExpenses()

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expenses, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "daily_expense_backup.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return (
        <div className="flex flex-col gap-6 pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-jersey font-normal tracking-wide">Settings</h1>
                <p className="text-muted-foreground">Manage preferences and data.</p>
            </div>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Appearance</h2>
                <Card className="p-4 flex items-center justify-between">
                    <span>Theme</span>
                    <div className="flex gap-1 bg-muted p-1 rounded-lg">
                        <Button
                            variant={theme === 'light' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setTheme('light')}
                            className="h-8 px-2"
                        >
                            <Sun className="h-4 w-4 mr-1" /> Light
                        </Button>
                        <Button
                            variant={theme === 'dark' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setTheme('dark')}
                            className="h-8 px-2"
                        >
                            <Moon className="h-4 w-4 mr-1" /> Dark
                        </Button>
                        <Button
                            variant={theme === 'system' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setTheme('system')}
                            className="h-8 px-2"
                        >
                            <Smartphone className="h-4 w-4 mr-1" /> System
                        </Button>
                    </div>
                </Card>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Data Management</h2>
                <Card className="p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-medium">Export Data</span>
                            <span className="text-xs text-muted-foreground">Download your data as JSON</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                    </div>
                </Card>
            </section>

            <div className="mt-8 text-center">
                <p className="text-xs text-muted-foreground">Daily Expense Diary v1.0.0</p>
            </div>
        </div>
    )
}
