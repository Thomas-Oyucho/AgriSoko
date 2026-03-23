import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Produce {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity_available: number;
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

    const { data, setData, post, processing, errors } = useForm({
        produce_id: produce.id,
        quantity: 1,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/consumer/orders');
    };

    const totalPrice = (parseFloat(produce.price) * data.quantity).toFixed(2);

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
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {produce.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="border-t pt-6">
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Quantity to Order (Max: {produce.quantity_available})</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            max={produce.quantity_available}
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                            required
                                        />
                                        {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">Total Price</div>
                                        <div className="text-2xl font-bold">KES {totalPrice}</div>
                                    </div>
                                </div>
                                <Button className="w-full" size="lg" disabled={processing || produce.quantity_available <= 0}>
                                    {produce.quantity_available > 0 ? 'Place Order' : 'Out of Stock'}
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
