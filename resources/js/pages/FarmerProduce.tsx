import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import type { Produce } from '@/types/produce';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function FarmerProduce() {
    const { produce } = usePage<{ produce: Produce[] }>().props;
    const { csrf } = usePage().props as any;

    return (
        <AppLayout>
            <Head title="My Produce" />
            <div className="flex justify-between items-center mb-4 p-4">
                <h1 className="text-2xl font-bold">My Produce</h1>
                <Link href="/farmer/produce/create">
                    <Button>Create new</Button>
                </Link>
            </div>
            {produce.length === 0 ? (
                <p className='p-4'>No produce listed yet.</p>
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
                                <TableCell>{item.category.category_name}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.quantity_available}</TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Link href={`/farmer/produce/${item.id}`}>
                                            <Button size="sm" variant="outline">View</Button>
                                        </Link>
                                        <Link href={`/farmer/produce/${item.id}/edit`}>
                                            <Button size="sm">Edit</Button>
                                        </Link>
                                        <form
                                            method="post"
                                            action={`/farmer/produce/${item.id}`}
                                            className="inline"
                                        >
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="delete"
                                            />
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value={csrf}
                                            />
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                type="submit"
                                            >
                                                Delete
                                            </Button>
                                        </form>
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
