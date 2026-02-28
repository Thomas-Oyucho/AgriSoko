import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function FarmerDashboard() {
    return (
        <AppLayout>
            <Head title="Farmer dashboard" />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
                <p>Here you can view your products, create new listings, and see orders from consumers.</p>
                {/* TODO: implement actual UI */}
            </div>
        </AppLayout>
    );
}
