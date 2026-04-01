import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Stats {
    activeFarmers: number;
    activeConsumers: number;
    totalSuccessfulPayments: number;
    totalOrders: number;
}

interface Farmer {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    location: string;
    is_verified: boolean;
}

interface Props {
    stats: Stats;
    recentUnverifiedFarmers: Farmer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function AdminDashboard({ stats, recentUnverifiedFarmers }: Props) {
    const { patch } = useForm();

    const handleVerify = (id: number) => {
        patch(`/admin/farmers/${id}/toggle-verification`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Farmers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeFarmers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Consumers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeConsumers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Successful Payments (30d)</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">KES {stats.totalSuccessfulPayments.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Unverified Farmers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUnverifiedFarmers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                                No unverified farmers found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recentUnverifiedFarmers.map((farmer) => (
                                            <TableRow key={farmer.id}>
                                                <TableCell className="font-medium">
                                                    {farmer.user.first_name} {farmer.user.last_name}
                                                </TableCell>
                                                <TableCell>{farmer.user.email}</TableCell>
                                                <TableCell>{farmer.location}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                        Pending
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                                        onClick={() => handleVerify(farmer.id)}
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Verify
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <div className="mt-4 text-center">
                                <Link
                                    href="/admin/farmers"
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline"
                                >
                                    View all farmers
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
