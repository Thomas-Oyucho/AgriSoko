import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';
import { TrendingUp, Users, Tag } from 'lucide-react';

interface Props {
    reports: {
        salesTrends: any[];
        registrationGrowth: any[];
        popularCategories: any[];
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'System Reports', href: '/admin/reports' },
];

export default function ReportsIndex({ reports }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Reports" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Sales Trends (by Month)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead className="text-right">Total Sales</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reports.salesTrends.map((trend) => (
                                        <TableRow key={trend.month}>
                                            <TableCell>{trend.month}</TableCell>
                                            <TableCell className="text-right font-medium">KES {trend.total.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Users className="h-5 w-5 text-emerald-600" />
                            <CardTitle>User Registration Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead className="text-right">New Users</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reports.registrationGrowth.map((growth) => (
                                        <TableRow key={growth.month}>
                                            <TableCell>{growth.month}</TableCell>
                                            <TableCell className="text-right font-medium">{growth.count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Tag className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Most Popular Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {reports.popularCategories.map((category) => (
                                    <div key={category.id} className="flex flex-col items-center p-4 rounded-xl border border-border bg-card">
                                        <span className="text-lg font-bold text-emerald-600">{category.produce_count}</span>
                                        <span className="text-sm font-medium text-center">{category.category_name}</span>
                                        <span className="text-xs text-muted-foreground">Products</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
