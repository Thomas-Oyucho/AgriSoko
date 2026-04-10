import { Head } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { TrendingUp, Users, Tag, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

interface SalesTrend {
    month: string;
    total: number;
}

interface RegistrationGrowth {
    month: string;
    count: number;
}

interface PopularCategory {
    id: number;
    category_name: string;
    produce_count: number;
}

interface Props {
    reports: {
        salesTrends: SalesTrend[];
        registrationGrowth: RegistrationGrowth[];
        popularCategories: PopularCategory[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'System Reports', href: '/admin/reports' },
];

export default function ReportsIndex({ reports }: Props) {
    // Sales Trend Data
    const salesChartData = {
        labels: reports.salesTrends.map((t) => t.month),
        datasets: [
            {
                label: 'Total Sales (KES)',
                data: reports.salesTrends.map((t) => t.total),
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: '#10b981',
                tension: 0.4,
                pointBackgroundColor: '#10b981',
            },
        ],
    };

    // Registration Growth Data
    const registrationChartData = {
        labels: reports.registrationGrowth.map((g) => g.month),
        datasets: [
            {
                label: 'New Users',
                data: reports.registrationGrowth.map((g) => g.count),
                backgroundColor: '#10b981',
                borderRadius: 4,
            },
        ],
    };

    // Popular Categories Data
    const categoriesChartData = {
        labels: reports.popularCategories.map((c) => c.category_name),
        datasets: [
            {
                data: reports.popularCategories.map((c) => c.produce_count),
                backgroundColor: [
                    '#10b981', // emerald-500
                    '#059669', // emerald-600
                    '#047857', // emerald-700
                    '#065f46', // emerald-800
                    '#064e3b', // emerald-900
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Reports" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Visual Charts Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <LineChartIcon className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Sales Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Line data={salesChartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            <CardTitle>User Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Bar data={registrationChartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Popular Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Pie data={categoriesChartData} options={pieOptions} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tables Section */}
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
                                    {reports.salesTrends.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                                                No sales data available.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        reports.salesTrends.map((trend) => (
                                            <TableRow key={trend.month}>
                                                <TableCell>{trend.month}</TableCell>
                                                <TableCell className="text-right font-medium">KES {trend.total.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
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
                                    {reports.registrationGrowth.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                                                No registration data available.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        reports.registrationGrowth.map((growth) => (
                                            <TableRow key={growth.month}>
                                                <TableCell>{growth.month}</TableCell>
                                                <TableCell className="text-right font-medium">{growth.count}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Tag className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Most Popular Categories Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {reports.popularCategories.length === 0 ? (
                                    <div className="col-span-full py-8 text-center text-muted-foreground">No category data available.</div>
                                ) : (
                                    reports.popularCategories.map((category) => (
                                        <div key={category.id} className="flex flex-col items-center p-4 rounded-xl border border-border bg-card">
                                            <span className="text-lg font-bold text-emerald-600">{category.produce_count}</span>
                                            <span className="text-sm font-medium text-center">{category.category_name}</span>
                                            <span className="text-xs text-muted-foreground">Products</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
