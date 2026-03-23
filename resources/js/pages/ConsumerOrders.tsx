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
    created_at: string;
    produce: {
        name: string;
        category: {
            category_name: string;
        };
        farmer: {
            user: {
                first_name: string;
                last_name: string;
            }
        }
    }
}

export default function ConsumerOrders() {
    const { orders } = usePage<{ orders: Order[] }>().props;

    return (
        <AppLayout>
            <Head title="My Orders" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                {orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Produce</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div>{order.produce.name}</div>
                                            <div className="text-xs text-gray-500">{order.produce.category.category_name}</div>
                                        </TableCell>
                                        <TableCell>{order.produce.farmer.user.first_name} {order.produce.farmer.user.last_name}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>KES {order.unit_price}</TableCell>
                                        <TableCell className="font-bold">KES {order.total_price}</TableCell>
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
