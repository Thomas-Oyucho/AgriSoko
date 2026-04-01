import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface Transaction {
    id: number;
    consumer: { user: { first_name: string; last_name: string } };
    produce: { name: string; farmer: { user: { first_name: string; last_name: string } } };
    total_price: number;
    status: string;
    created_at: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Transactions', href: '/admin/transactions' },
];

export default function TransactionIndex({ transactions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Transactions" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Payment Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Consumer</TableHead>
                                    <TableHead>Produce</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{format(new Date(transaction.created_at), 'dd MMM yyyy')}</TableCell>
                                        <TableCell>{transaction.consumer.user.first_name} {transaction.consumer.user.last_name}</TableCell>
                                        <TableCell>{transaction.produce.name}</TableCell>
                                        <TableCell>{transaction.produce.farmer.user.first_name} {transaction.produce.farmer.user.last_name}</TableCell>
                                        <TableCell className="font-medium">KES {transaction.total_price.toLocaleString()}</TableCell>
                                        <TableCell>
                                            {transaction.status === 'paid' ? (
                                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Paid</Badge>
                                            ) : (
                                                <Badge variant="destructive">Failed</Badge>
                                            )}
                                        </TableCell>
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
