import { Head, useForm } from '@inertiajs/react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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
    farmers: {
        data: Farmer[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Farmers', href: '/admin/farmers' },
];

export default function FarmerIndex({ farmers }: Props) {
    const { patch } = useForm();

    const handleToggleVerify = (id: number) => {
        patch(`/admin/farmers/${id}/toggle-verification`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Farmers" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Farmer Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Farmer Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {farmers.data.map((farmer) => (
                                    <TableRow key={farmer.id}>
                                        <TableCell className="font-medium">
                                            {farmer.user.first_name} {farmer.user.last_name}
                                        </TableCell>
                                        <TableCell>{farmer.user.email}</TableCell>
                                        <TableCell>{farmer.location}</TableCell>
                                        <TableCell>
                                            {farmer.is_verified ? (
                                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Verified</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Approval</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant={farmer.is_verified ? "outline" : "default"}
                                                className={farmer.is_verified ? "text-red-600 border-red-200 hover:bg-red-50" : "bg-emerald-600 hover:bg-emerald-700"}
                                                onClick={() => handleToggleVerify(farmer.id)}
                                            >
                                                {farmer.is_verified ? (
                                                    <><XCircle className="mr-2 h-4 w-4" /> Revoke</>
                                                ) : (
                                                    <><CheckCircle className="mr-2 h-4 w-4" /> Verify</>
                                                )}
                                            </Button>
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
