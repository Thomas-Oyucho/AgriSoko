import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface Order {
    id: number;
    consumer: { user: { first_name: string; last_name: string } };
    produce: { name: string; farmer: { user: { first_name: string; last_name: string } } };
    quantity: number;
    total_price: number;
    status: string;
    created_at: string;
}

interface Props {
    orders: {
        data: Order[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Orders', href: '/admin/orders' },
];

export default function OrderIndex({ orders }: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid': return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Paid</Badge>;
            case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
            case 'cancelled': return <Badge variant="outline">Cancelled</Badge>;
            case 'failed': return <Badge variant="destructive">Failed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Orders" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>All System Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Consumer</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-mono text-xs">#{order.id}</TableCell>
                                        <TableCell>{format(new Date(order.created_at), 'dd MMM yyyy')}</TableCell>
                                        <TableCell>{order.consumer.user.first_name} {order.consumer.user.last_name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{order.produce.name}</span>
                                                <span className="text-xs text-muted-foreground">by {order.produce.farmer.user.first_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">KES {order.total_price.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
