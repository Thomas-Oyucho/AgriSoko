import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingCart, TrendingUp, Users, Wallet } from 'lucide-react';

interface Produce {
    id: number;
    name: string;
    price: number;
    quantity_available: number;
    picture: string | null;
    category: {
        category_name: string;
    };
    farmer: {
        user: {
            first_name: string;
            last_name: string;
        };
    };
}

interface Farmer {
    id: number;
    user: {
        first_name: string;
        last_name: string;
    };
}

interface Props {
    featuredProduces: Produce[];
    allProduces: Produce[];
    stats: {
        market: string;
        service: string;
        balance: string;
    };
    marketPlaces: Farmer[];
}

export default function ConsumerDashboard({ featuredProduces, allProduces, stats, marketPlaces }: Props) {
    return (
        <AppLayout>
            <Head title="Consumer Dashboard" />
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Main Content */}
                <div className="flex-1 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your marketplace today.</p>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-emerald-50 border-none shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-full">
                                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Market</p>
                                        <h3 className="text-xl font-bold text-emerald-950">{stats.market}</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-amber-50 border-none shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-100 rounded-full">
                                        <Users className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Service</p>
                                        <h3 className="text-xl font-bold text-amber-950">{stats.service}</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-indigo-50 border-none shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <Wallet className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Balance</p>
                                        <h3 className="text-xl font-bold text-indigo-950">${stats.balance}</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Featured Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Featured Produces</h2>
                            <Link href={route('consumer.produce.index')} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                View all
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {featuredProduces.map((produce) => (
                                <Card key={produce.id} className="overflow-hidden border-gray-100 hover:shadow-md transition-shadow group">
                                    <div className="aspect-square relative overflow-hidden bg-gray-50">
                                        <img
                                            src={produce.picture || `/placeholder.svg?height=200&width=200&text=${produce.name}`}
                                            alt={produce.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Button size="icon" variant="secondary" className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                            <Link href={route('consumer.produce.show', produce.id)}>
                                                <Plus className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                    <CardContent className="p-3">
                                        <h4 className="font-semibold text-sm truncate">{produce.name}</h4>
                                        <p className="text-emerald-600 font-bold text-sm">${produce.price}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                        <Card className="border-gray-100 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow>
                                        <TableHead className="text-xs font-semibold uppercase tracking-wider">Produce</TableHead>
                                        <TableHead className="text-xs font-semibold uppercase tracking-wider">Farmer</TableHead>
                                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Price</TableHead>
                                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Stock</TableHead>
                                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allProduces.map((produce) => (
                                        <TableRow key={produce.id} className="hover:bg-gray-50/50">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                                                        <img src={produce.picture || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm text-gray-900">{produce.name}</div>
                                                        <div className="text-xs text-gray-500">{produce.category?.category_name}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {produce.farmer.user.first_name} {produce.farmer.user.last_name}
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold text-gray-900 text-right">
                                                ${produce.price}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={produce.quantity_available > 10 ? "secondary" : "destructive"} className="font-medium">
                                                    {produce.quantity_available}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button size="sm" variant="outline" className="h-8 gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800" asChild>
                                                    <Link href={route('consumer.produce.show', produce.id)}>
                                                        <ShoppingCart className="w-3.5 h-3.5" />
                                                        Order
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    <Card className="border-gray-100 shadow-sm sticky top-6">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-gray-900">Market Places</h2>
                                <Avatar className="w-8 h-8 ring-2 ring-white">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-4">
                                {marketPlaces.map((farmer) => (
                                    <div key={farmer.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                                                {farmer.user.first_name[0]}{farmer.user.last_name[0]}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                                                    {farmer.user.first_name} {farmer.user.last_name}
                                                </div>
                                                <div className="text-xs text-gray-500">Local Farmer</div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-emerald-600 shrink-0">$99+</div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                                Summary
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Secondary List Example */}
                    <div className="space-y-4 px-1">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</h3>
                        <div className="space-y-1">
                            {[
                                { name: 'Conyanta', amount: 170.66, color: 'text-red-500' },
                                { name: 'Priedto', amount: 155, color: 'text-red-500' },
                                { name: 'Frotudad', amount: 1965, color: 'text-emerald-500' },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                    </div>
                                    <span className={`text-xs font-bold ${item.color}`}>${item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Helper for route function if global not available
function route(name: string, params?: any) {
    if (name === 'consumer.produce.index') return '/consumer/produce';
    if (name === 'consumer.produce.show') return `/consumer/produce/${params}`;
    return '#';
}
