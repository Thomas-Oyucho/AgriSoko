import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import AppLayout from '@/layouts/app-layout';

interface Produce {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity_available: number;
    picture?: string;
    stock_unit?: string;
    category: {
        category_name: string;
    };
    farmer: {
        user: {
            first_name: string;
            last_name: string;
        }
    }
}

export default function ConsumerProduceShow() {
    const { produce } = usePage<{ produce: Produce }>().props;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        addToCart({
            id: Date.now(), // Unique ID for cart item entry
            produce_id: produce.id,
            name: produce.name,
            quantity: quantity,
            unit_price: parseFloat(produce.price),
            farmer_name: `${produce.farmer.user.first_name} ${produce.farmer.user.last_name}`,
            picture: produce.picture,
            stock_available: produce.quantity_available,
            stock_unit: produce.stock_unit
        });

        router.visit('/consumer/cart');
    };

    const totalPrice = (parseFloat(produce.price) * quantity).toFixed(2);

    return (
        <AppLayout>
            <Head title={`View ${produce.name}`} />
            <div className="p-4 flex flex-col items-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl">{produce.name}</CardTitle>
                                <CardDescription className="text-lg">
                                    {produce.category.category_name} | Sold by {produce.farmer.user.first_name} {produce.farmer.user.last_name}
                                </CardDescription>
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                KES {produce.price} / unit
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {produce.picture && (
                            <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                                <img
                                    src={produce.picture}
                                    alt={produce.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {produce.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="border-t pt-6">
                            <form onSubmit={handleAddToCart} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Quantity (Max: {produce.quantity_available} {produce.stock_unit})</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            max={produce.quantity_available}
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">Total Price</div>
                                        <div className="text-2xl font-bold">KES {totalPrice}</div>
                                    </div>
                                </div>
                                <Button className="w-full" size="lg" disabled={produce.quantity_available <= 0}>
                                    {produce.quantity_available > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t py-4">
                        <Link href="/consumer/produce" className="text-sm text-blue-600 hover:underline">
                            Back to Produce List
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
