import { Head, useForm, usePage, router } from '@inertiajs/react';
import type { FormEventHandler} from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    produce: {
        id: number;
        name: string;
        quantity_available: number;
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
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
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
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                order.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                order.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {order.status === 'pending' && (
                                                    <>
                                                        <EditOrderDialog order={order} />
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to cancel this order?')) {
                                                                    router.delete(`/consumer/orders/${order.id}`);
                                                                }
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
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

function EditOrderDialog({ order }: { order: Order }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, processing, errors } = useForm({
        quantity: order.quantity,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/consumer/orders/${order.id}`, {
            onSuccess: () => setOpen(false),
        });
    };

    const maxQuantity = order.quantity + order.produce.quantity_available;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Edit Order</DialogTitle>
                        <DialogDescription>
                            Adjust the quantity for your order of {order.produce.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity (Max available: {maxQuantity})</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                max={maxQuantity}
                                value={data.quantity}
                                onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                required
                            />
                            {errors.quantity && <div className="text-red-500 text-sm">{errors.quantity}</div>}
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Unit Price: </span>
                            <span className="font-medium">KES {order.unit_price}</span>
                        </div>
                        <div className="text-lg font-bold">
                            Total: KES {(parseFloat(order.unit_price) * data.quantity).toFixed(2)}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={processing}>Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
