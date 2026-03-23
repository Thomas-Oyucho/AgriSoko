import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Produce } from '@/types/produce';

export default function FarmerProduce() {
    const { produce } = usePage<{ produce: Produce[] }>().props;

    return (
        <AppLayout>
            <Head title="My Produce" />
            <div className="mb-4 flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold">My Produce</h1>
                <Link href="/farmer/produce/create">
                    <Button>Create new</Button>
                </Link>
            </div>
            {produce.length === 0 ? (
                <p className="p-4">No produce listed yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {produce.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {item.category.category_name}
                                </TableCell>
                                <TableCell>KES{item.price}</TableCell>
                                <TableCell>{item.quantity_available}</TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Link
                                            href={`/farmer/produce/${item.id}`}
                                        >
                                            <Button size="sm" variant="outline">
                                                View
                                            </Button>
                                        </Link>
                                        <Link
                                            href={`/farmer/produce/${item.id}/edit`}
                                        >
                                            <Button size="sm">Edit</Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Are you sure you want to delete this item?',
                                                    )
                                                ) {
                                                    router.delete(
                                                        `/farmer/produce/${item.id}`,
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </AppLayout>
    );
}
