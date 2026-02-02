import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, ShieldCheck, PieChart, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background font-jost text-foreground">
            {/* Navbar */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-lg border-b bg-background/50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-jersey text-primary">ExpenseDiary</span>
                    </div>
                    <nav className="hidden gap-8 md:flex items-center">
                        <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                        <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button className="font-jost font-medium">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/50">
                        🚀 Take Control of Your Finance
                    </div>
                    <h1 className="text-6xl md:text-8xl font-jersey tracking-tight max-w-4xl leading-[0.9]">
                        Your Personal Finance <span className="text-primary">Masterclass</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
                        Track expenses, analyze spending, and save money with a minimalist, premium experience designed for humans.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                        <Link href="/dashboard" className="w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto font-jost">
                                Start Tracking <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#features" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto font-jost">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="container mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-jersey mb-4">Everything You Need</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                            Powerful features packed into a simple, elegant interface.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Wallet className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-jersey mb-3 group-hover:text-primary transition-colors">Smart Tracking</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Add expenses in seconds with our One-Tap One-Handed drawer interface designed for speed.
                            </p>
                        </Card>

                        <Card className="p-8 border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <PieChart className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-jersey mb-3 group-hover:text-primary transition-colors">Visual Analytics</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Understand where your money goes with beautiful, interactive charts and insights.
                            </p>
                        </Card>

                        <Card className="p-8 border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-jersey mb-3 group-hover:text-primary transition-colors">Private & Secure</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Your financial data stays on your device. Local-first architecture for maximum privacy.
                            </p>
                        </Card>
                    </div>
                </section>
            </main>

            <footer className="border-t py-12 bg-muted/20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
                    <p className="font-medium">© {new Date().getFullYear()} ExpenseDiary. Built with precision.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 font-medium">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
