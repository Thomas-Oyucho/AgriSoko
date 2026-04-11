import { Head } from '@inertiajs/react';
<<<<<<< HEAD
<<<<<<< HEAD
import { TrendingUp, Users, Tag, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
=======
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
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
import { TrendingUp, Users, Tag, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface SalesTrend {
    month: string;
    total: number;
}

interface RegistrationGrowth {
    month: string;
    count: number;
}

interface CategorySale {
    category_name: string;
    total_revenue: number;
}

interface Props {
    reports: {
        salesTrends: SalesTrend[];
        registrationGrowth: RegistrationGrowth[];
        categorySales: CategorySale[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'System Reports', href: '/admin/reports' },
];

const colors = [
    '#10b981', // emerald-500
    '#3b82f6', // blue-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
];

export default function ReportsIndex({ reports }: Props) {
<<<<<<< HEAD
<<<<<<< HEAD
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value);

    // Prepare data for Recharts
    const salesData = reports.salesTrends.map(t => ({
        month: t.month,
        total: t.total,
    }));

    const registrationData = reports.registrationGrowth.map(g => ({
        month: g.month,
        count: g.count,
    }));

    const categoryData = reports.categorySales.map((c, index) => ({
        name: c.category_name,
        value: Number(c.total_revenue),
        fill: colors[index % colors.length],
    }));

    const chartConfig = {
        sales: {
            label: "Sales",
            color: "#10b981",
        },
        users: {
            label: "Users",
            color: "#10b981",
=======
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
=======
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value);

    // Prepare data for Recharts
    const salesData = reports.salesTrends.map(t => ({
        month: t.month,
        total: t.total,
    }));

    const registrationData = reports.registrationGrowth.map(g => ({
        month: g.month,
        count: g.count,
    }));
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)

    const categoryData = reports.categorySales.map((c, index) => ({
        name: c.category_name,
        value: Number(c.total_revenue),
        fill: colors[index % colors.length],
    }));

    const chartConfig = {
        sales: {
            label: "Sales",
            color: "#10b981",
        },
<<<<<<< HEAD
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
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
        users: {
            label: "Users",
            color: "#10b981",
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Reports" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Visual Charts Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                    {/* Sales Trend Line Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <LineChartIcon className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>Sales Trend</CardTitle>
                                <CardDescription>Last 6 months revenue</CardDescription>
                            </div>
<<<<<<< HEAD
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ChartContainer config={chartConfig.sales}>
                                    <LineChart data={salesData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.split('-')[1]}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent formatter={formatCurrency} />} />
                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="var(--color-sales)"
                                            strokeWidth={2}
                                            dot={{ fill: "var(--color-sales)" }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
=======
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <LineChartIcon className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Sales Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Line data={salesChartData} options={chartOptions} />
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ChartContainer config={chartConfig.sales}>
                                    <LineChart data={salesData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.split('-')[1]}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent formatter={formatCurrency} />} />
                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="var(--color-sales)"
                                            strokeWidth={2}
                                            dot={{ fill: "var(--color-sales)" }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                            </div>
                        </CardContent>
                    </Card>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                    {/* User Growth Bar Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>User Growth</CardTitle>
                                <CardDescription>Last 6 months registrations</CardDescription>
                            </div>
<<<<<<< HEAD
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ChartContainer config={chartConfig.users}>
                                    <BarChart data={registrationData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.split('-')[1]}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar
                                            dataKey="count"
                                            fill="var(--color-users)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
=======
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            <CardTitle>User Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Bar data={registrationChartData} options={chartOptions} />
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ChartContainer config={chartConfig.users}>
                                    <BarChart data={registrationData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.split('-')[1]}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar
                                            dataKey="count"
                                            fill="var(--color-users)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                            </div>
                        </CardContent>
                    </Card>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                    {/* Category Sales Pie Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>Category Sales</CardTitle>
                                <CardDescription>Current month revenue</CardDescription>
                            </div>
<<<<<<< HEAD
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={formatCurrency} />} />
                                        <Pie
                                            data={categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            outerRadius={80}
                                            strokeWidth={5}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
=======
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-emerald-600" />
                            <CardTitle>Popular Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <Pie data={categoriesChartData} options={pieOptions} />
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={formatCurrency} />} />
                                        <Pie
                                            data={categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            outerRadius={80}
                                            strokeWidth={5}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
                            </div>
                        </CardContent>
                    </Card>
                </div>

<<<<<<< HEAD
<<<<<<< HEAD
                {/* Data Tables Section remains the same */}
=======
                {/* Data Tables Section */}
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
                {/* Data Tables Section remains the same */}
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
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
<<<<<<< HEAD
<<<<<<< HEAD
                                                <TableCell className="text-right font-medium">KES {Number(trend.total).toLocaleString()}</TableCell>
=======
                                                <TableCell className="text-right font-medium">KES {trend.total.toLocaleString()}</TableCell>
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
=======
                                                <TableCell className="text-right font-medium">KES {Number(trend.total).toLocaleString()}</TableCell>
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
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
<<<<<<< HEAD
                            <CardTitle>Category Sales Details (Current Month)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {reports.categorySales.length === 0 ? (
                                    <div className="col-span-full py-8 text-center text-muted-foreground">No category sales data for current month.</div>
                                ) : (
                                    reports.categorySales.map((sale) => (
                                        <div key={sale.category_name} className="flex flex-col items-center p-4 rounded-xl border border-border bg-card">
                                            <span className="text-lg font-bold text-emerald-600">KES {Number(sale.total_revenue).toLocaleString()}</span>
                                            <span className="text-sm font-medium text-center">{sale.category_name}</span>
                                            <span className="text-xs text-muted-foreground">Revenue</span>
=======
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
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
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
