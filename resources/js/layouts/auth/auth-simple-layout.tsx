import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-linear-to-br from-[#f0f9ff] to-[#e0f2fe] p-6 md:p-10 dark:from-slate-900 dark:to-slate-800">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-950">
                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href={home()}
                            className="flex items-center gap-2 font-medium"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md text-[#22c55e]">
                                <AppLogoIcon className="size-10 fill-current" />
                            </div>
                            <span className="text-3xl font-bold text-[#1e293b] dark:text-white">FarmConnect AgriSoko</span>
                        </Link>

                        <div className="mt-4 space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-[#1e293b] dark:text-white">{title}</h1>
                            <div className="flex justify-center">
                                <Link
                                    href="/register"
                                    className="text-sm font-medium text-[#22c55e] underline underline-offset-4 hover:text-[#16a34a]"
                                >
                                    Change role
                                </Link>
                            </div>
                            {description && (
                                <p className="text-center text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
