import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function AdminDashboard() {
    return (
        <AppLayout>
            <Head title="Admin dashboard" />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p>View all farmers, consumers, and orders. Verify farmers as needed.</p>
                {/* TODO: implement actual UI */}
            </div>
        </AppLayout>
    );
}
