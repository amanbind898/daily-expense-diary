import { BottomNav } from "@/components/bottom-nav"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col pb-20 sm:pb-0">
            <main className="flex-1 container max-w-md mx-auto p-4 sm:p-6">
                {children}
            </main>
            <div>
                <BottomNav />
            </div>
        </div>
    )
}
