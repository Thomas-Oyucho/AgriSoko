import { Head } from '@inertiajs/react';
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
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Reports" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Visual Charts Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Sales Trend Line Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <LineChartIcon className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>Sales Trend</CardTitle>
                                <CardDescription>Last 6 months revenue</CardDescription>
                            </div>
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Growth Bar Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>User Growth</CardTitle>
                                <CardDescription>Last 6 months registrations</CardDescription>
                            </div>
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Sales Pie Chart */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-emerald-600" />
                            <div className="grid gap-1">
                                <CardTitle>Category Sales</CardTitle>
                                <CardDescription>Current month revenue</CardDescription>
                            </div>
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
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tables Section remains the same */}
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
                                                <TableCell className="text-right font-medium">KES {Number(trend.total).toLocaleString()}</TableCell>
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
