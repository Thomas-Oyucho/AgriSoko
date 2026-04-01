import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { LayoutDashboard, ShoppingCart, CreditCard, Clock, Search, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

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
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-success" />
                        Consumer Dashboard
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-card border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                            <ShoppingCart className="w-4 h-4 text-success" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
                            <p className="text-xs text-muted-foreground mt-1">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                            <CreditCard className="w-4 h-4 text-success" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">KES {stats.totalSpent.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Paid orders</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
                            <Clock className={`w-4 h-4 ${stats.pendingPayments > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stats.pendingPayments > 0 ? 'text-warning' : 'text-foreground'}`}>
                                {stats.pendingPayments}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Recent Orders */}
                    <Card className="md:col-span-2 bg-card border-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableHead className="text-muted-foreground">Order ID</TableHead>
                                            <TableHead className="text-muted-foreground">Farmer</TableHead>
                                            <TableHead className="text-muted-foreground">Product</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                                            <TableHead className="text-muted-foreground">Status</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentOrders.map((order) => (
                                            <TableRow key={order.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium text-foreground">#{order.id}</TableCell>
                                                <TableCell className="text-foreground">
                                                    {order.produce.farmer.user.first_name} {order.produce.farmer.user.last_name}
                                                </TableCell>
                                                <TableCell className="text-foreground">{order.produce.name}</TableCell>
                                                <TableCell className="text-right text-foreground font-medium">
                                                    KES {order.total_price.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            order.status === 'paid'
                                                                ? 'bg-success/10 text-success border-success/20'
                                                                : order.status === 'pending'
                                                                ? 'bg-warning/10 text-warning border-warning/20'
                                                                : 'bg-muted text-muted-foreground border-border'
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">
                                                    {format(new Date(order.created_at), 'MMM d, yyyy')}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">No orders found yet.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card className="bg-card border-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                asChild
                                className="w-full justify-start gap-2 bg-success hover:bg-success/90 text-success-foreground border-none"
                            >
                                <Link href='/consumer/produce'>
                                    <Search className="w-4 h-4" />
                                    Browse Produce
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start gap-2"
                            >
                                <Link href='/consumer/orders'>
                                    <List className="w-4 h-4" />
                                    View My Orders
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start gap-2"
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
