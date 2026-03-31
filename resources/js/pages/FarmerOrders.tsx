import { Head, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Order {
    id: number;
    quantity: number;
    unit_price: string;
    total_price: string;
    status: string;
    created_at: string;
    consumer: {
        user: {
            first_name: string;
            last_name: string;
        }
    }
    produce: {
        name: string;
        category: {
            category_name: string;
        }
    }
}

export default function FarmerOrders() {
    const { orders } = usePage<{ orders: Order[] }>().props;

    return (
        <AppLayout>
            <Head title="Orders Received" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Orders Received</h1>
                {orders.length === 0 ? (
                    <p>No orders received yet.</p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Consumer</TableHead>
                                    <TableHead>Produce</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.consumer.user.first_name} {order.consumer.user.last_name}</TableCell>
                                        <TableCell>
                                            <div>{order.produce.name}</div>
                                            <div className="text-xs text-gray-500">{order.produce.category.category_name}</div>
                                        </TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>KES {order.unit_price}</TableCell>
                                        <TableCell className="font-bold">KES {order.total_price}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                order.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status === 'paid' ? 'Paid' : (order.status === 'failed' ? 'Failed' : 'Pending')}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
