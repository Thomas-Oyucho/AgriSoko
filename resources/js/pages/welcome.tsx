import { Head, Link, usePage } from '@inertiajs/react';
import {
    Leaf,
    MessageSquare,
    ShoppingBasket,
    Clock,
    ArrowRight,
    CheckCircle2,
    Store,
    ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { SharedProps } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedProps>().props;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-stone-950 dark:text-stone-50">
            <Head title="Welcome to FarmConnect AgriSoko" />

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                            <Leaf className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-400">
                            FarmConnect <span className="font-medium text-stone-600 dark:text-stone-400">AgriSoko</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400">
                                <Link href="/dashboard">
                                    Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-emerald-600 sm:block dark:text-stone-400 dark:hover:text-emerald-400"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
                    <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-transparent to-transparent dark:from-emerald-950/20"></div>
                    <div className="mx-auto max-w-7xl text-center">
                        <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl dark:text-white">
                            Direct from the <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Farm</span>,<br />
                            to your <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Market</span>.
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700 text-lg leading-8 text-stone-600 dark:text-stone-400">
                            Connecting farmers and consumers through a seamless digital marketplace.
                            Fresh produce, fair prices, and direct communication.
                        </p>
                        <div className="mt-10 flex animate-in fade-in slide-in-from-bottom-8 delay-300 duration-700 items-center justify-center gap-x-6">
                            {!auth.user && (
                                <>
                                    <Button asChild size="lg" className="group bg-emerald-600 px-8 hover:bg-emerald-700">
                                        <Link href="/register/consumer">
                                            I want to Buy
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400">
                                        <Link href="/register/farmer">I want to Sell</Link>
                                    </Button>
                                </>
                            )}
                            {auth.user && (
                                <Button asChild size="lg" className="group bg-emerald-600 px-8 hover:bg-emerald-700">
                                    <Link href="/dashboard">
                                        Return to Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Portal / Dual Path Section */}
                <section className="bg-white py-24 dark:bg-stone-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2">
                            {/* Farmer Path */}
                            <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-8 transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-stone-800 dark:bg-stone-900">
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-100/50 transition-transform group-hover:scale-150 dark:bg-amber-900/10"></div>
                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
                                        <Store className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">For Farmers</h3>
                                    <p className="mt-4 text-stone-600 dark:text-stone-400">
                                        List your fresh produce, manage inventory in real-time, and connect directly with local consumers. Take control of your sales and grow your farming business.
                                    </p>
                                    <ul className="mt-6 space-y-3">
                                        {[
                                            'Easy produce listing',
                                            'Direct buyer messaging',
                                            'Order management system',
                                            'Sales analytics'
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={auth.user ? "/dashboard" : "/register/farmer"}
                                        className="mt-8 inline-flex items-center font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
                                    >
                                        Start Selling <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Consumer Path */}
                            <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-8 transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-stone-800 dark:bg-stone-900">
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/50 transition-transform group-hover:scale-150 dark:bg-emerald-900/10"></div>
                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500">
                                        <ShoppingBasket className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">For Consumers</h3>
                                    <p className="mt-4 text-stone-600 dark:text-stone-400">
                                        Discover the freshest produce from local farms. Browse catalogs, chat with farmers, and place orders directly for the best seasonal products.
                                    </p>
                                    <ul className="mt-6 space-y-3">
                                        {[
                                            'Browse local farm produce',
                                            'Secure direct ordering',
                                            'Real-time farmer chat',
                                            'Order tracking'
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={auth.user ? "/dashboard" : "/register/consumer"}
                                        className="mt-8 inline-flex items-center font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
                                    >
                                        Start Shopping <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400 tracking-widest">Features</h2>
                            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-stone-900 sm:text-4xl dark:text-white">
                                Everything you need to trade fresh.
                            </p>
                        </div>

                        <div className="mt-20 grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    title: "Direct Messaging",
                                    icon: MessageSquare,
                                    desc: "Communicate directly with your buyers or sellers. Clarify quantities, delivery times, and more."
                                },
                                {
                                    title: "Secure Orders",
                                    icon: ShieldCheck,
                                    desc: "Place and manage orders with confidence. Our system tracks everything from placement to completion."
                                },
                                {
                                    title: "Inventory Management",
                                    icon: Clock,
                                    desc: "Farmers can update their stock units and prices instantly, ensuring consumers always see what's available."
                                }
                            ].map((feature, idx) => (
                                <Card key={idx} className="group border-none bg-stone-50 shadow-none transition-all hover:bg-white hover:shadow-xl dark:bg-stone-900/30 dark:hover:bg-stone-900">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition-transform group-hover:scale-110 group-hover:rotate-3">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <h4 className="text-xl font-bold dark:text-white group-hover:text-emerald-600 transition-colors">{feature.title}</h4>
                                        <p className="mt-2 text-stone-600 dark:text-stone-400">
                                            {feature.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics / Social Proof */}
                <section className="relative border-y border-stone-200 bg-emerald-600 py-16 dark:border-stone-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 text-center md:grid-cols-3">
                            {[
                                { val: "100%", label: "Fresh Guarantee" },
                                { val: "Direct", label: "Farmer Interaction" },
                                { val: "Fair", label: "Price Model" }
                            ].map((stat, idx) => (
                                <div key={idx} className="transition-transform hover:scale-105">
                                    <p className="text-4xl font-bold text-white">{stat.val}</p>
                                    <p className="mt-1 text-emerald-100">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-stone-50 py-12 dark:bg-stone-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 border-t border-stone-200 pt-8 md:flex-row dark:border-stone-800">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-5 w-5 text-emerald-600" />
                            <span className="font-bold text-stone-900 dark:text-white">FarmConnect AgriSoko</span>
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                            © {new Date().getFullYear()} FarmConnect AgriSoko. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400 transition-colors">Terms</Link>
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400 transition-colors">Privacy</Link>
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
