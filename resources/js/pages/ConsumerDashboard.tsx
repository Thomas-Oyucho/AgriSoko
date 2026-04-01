import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, CreditCard, Clock, Search, List } from 'lucide-react';
import { format } from 'date-fns';

interface Order {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
    produce: {
        name: string;
        farmer: {
            user: {
                first_name: string;
                last_name: string;
            };
        };
    };
}

interface Props {
    stats: {
        totalOrders: number;
        totalSpent: number;
        pendingPayments: number;
    };
    recentOrders: Order[];
}

export default function ConsumerDashboard({ stats, recentOrders }: Props) {
    return (
        <AppLayout>
            <Head title="Consumer Dashboard" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-emerald-600" />
                        Consumer Dashboard
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-white border-stone-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-stone-600">Total Orders</CardTitle>
                            <ShoppingCart className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-stone-900">{stats.totalOrders}</div>
                            <p className="text-xs text-stone-500 mt-1">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-stone-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-stone-600">Total Spent</CardTitle>
                            <CreditCard className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-stone-900">KES {stats.totalSpent.toLocaleString()}</div>
                            <p className="text-xs text-stone-500 mt-1">Paid orders</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-stone-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-stone-600">Pending Payments</CardTitle>
                            <Clock className={`w-4 h-4 ${stats.pendingPayments > 0 ? 'text-amber-500' : 'text-stone-300'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stats.pendingPayments > 0 ? 'text-amber-600' : 'text-stone-900'}`}>
                                {stats.pendingPayments}
                            </div>
                            <p className="text-xs text-stone-500 mt-1">Awaiting action</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Recent Orders */}
                    <Card className="md:col-span-2 bg-white border-stone-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-stone-900">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-stone-50/50">
                                            <TableHead className="text-stone-600">Order ID</TableHead>
                                            <TableHead className="text-stone-600">Farmer</TableHead>
                                            <TableHead className="text-stone-600">Product</TableHead>
                                            <TableHead className="text-stone-600 text-right">Amount</TableHead>
                                            <TableHead className="text-stone-600">Status</TableHead>
                                            <TableHead className="text-stone-600 text-right">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentOrders.map((order) => (
                                            <TableRow key={order.id} className="hover:bg-stone-50/50">
                                                <TableCell className="font-medium text-stone-900">#{order.id}</TableCell>
                                                <TableCell className="text-stone-700">
                                                    {order.produce.farmer.user.first_name} {order.produce.farmer.user.last_name}
                                                </TableCell>
                                                <TableCell className="text-stone-700">{order.produce.name}</TableCell>
                                                <TableCell className="text-right text-stone-900 font-medium">
                                                    KES {order.total_price.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            order.status === 'paid'
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                                : order.status === 'pending'
                                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                                : 'bg-stone-50 text-stone-700 border-stone-200'
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right text-stone-500">
                                                    {format(new Date(order.created_at), 'MMM d, yyyy')}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8 text-stone-500">No orders found yet.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card className="bg-white border-stone-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-stone-900">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                asChild
                                className="w-full justify-start gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                            >
                                <Link href='/consumer/produce'>
                                    <Search className="w-4 h-4" />
                                    Browse Produce
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start gap-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                            >
                                <Link href='/consumer/orders'>
                                    <List className="w-4 h-4" />
                                    View My Orders
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start gap-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                            >
                                <Link href='/consumer/cart'>
                                    <ShoppingCart className="w-4 h-4" />
                                    My Shopping Cart
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
