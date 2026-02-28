import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function ConsumerDashboard() {
    return (
        <AppLayout>
            <Head title="Consumer dashboard" />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Consumer Dashboard</h1>
                <p>Browse farmers and products, place orders, and view your order history here.</p>
                {/* TODO: implement actual UI */}
            </div>
        </AppLayout>
    );
}
