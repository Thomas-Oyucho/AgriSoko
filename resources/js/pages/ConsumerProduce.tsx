import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Produce {
    id: number;
    name: string;
    price: string;
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

export default function ConsumerProduce() {
    const { produces } = usePage<{ produces: Produce[] }>().props;

    return (
        <AppLayout>
            <Head title="Available Produces" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Available Produces</h1>
                {produces.length === 0 ? (
                    <p>No produces available at the moment.</p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {produces.map((produce) => (
                                    <TableRow key={produce.id}>
                                        <TableCell className="font-medium">{produce.name}</TableCell>
                                        <TableCell>{produce.category.category_name}</TableCell>
                                        <TableCell>{produce.farmer.user.first_name} {produce.farmer.user.last_name}</TableCell>
                                        <TableCell>KES {produce.price}</TableCell>
                                        <TableCell>{produce.quantity_available}</TableCell>
                                        <TableCell>
                                            <Link href={`/consumer/produce/${produce.id}`}>
                                                <Button size="sm">View & Order</Button>
                                            </Link>
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
