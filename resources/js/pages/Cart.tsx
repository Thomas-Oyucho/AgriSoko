import { Head, Link, router, usePage } from '@inertiajs/react';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { PaymentModal } from '@/components/PaymentModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import AppLayout from '@/layouts/app-layout';
import type { SharedProps } from '@/types';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [orderIds, setOrderIds] = useState<number[]>([]);

    const { flash } = usePage<SharedProps>().props;
    const [prevFlash, setPrevFlash] = useState(flash);

    if (flash !== prevFlash) {
        setPrevFlash(flash);
        if (flash?.showPaymentModal && flash.orderIds) {
            setOrderIds(flash.orderIds);
            setShowPayment(true);
        }
    }

    const handleCheckout = () => {
        if (!phoneNumber) {
            alert('Please enter your M-Pesa phone number');
            return;
        }

        router.post('/consumer/orders/bulk', {
            items: cart.map(item => ({
                produce_id: item.produce_id,
                quantity: item.quantity
            })),
            phone_number: phoneNumber,
            total_amount: totalPrice
        });
    };

    const handlePaymentStatus = (status: 'paid' | 'failed') => {
        setShowPayment(false);
        if (status === 'paid') {
            clearCart();
        }
        router.post('/consumer/orders/simulate-payment', {
            order_ids: orderIds,
            status: status
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Cart', href: '/consumer/cart' }]}>
            <Head title="Your Cart" />

            <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8 text-success" />
                    Your Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent className="space-y-4">
                            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                            <p className="text-xl text-muted-foreground">Your cart is empty</p>
                            <Button asChild variant="outline">
                                <Link href="/consumer/produce">Browse Produce</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.produce_id} className="overflow-hidden">
                                    <div className="flex flex-col sm:flex-row">
                                        {item.picture && (
                                            <div className="w-full sm:w-32 h-32 flex-shrink-0">
                                                <img
                                                    src={item.picture}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-4 flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Sold by {item.farmer_name}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                    onClick={() => removeFromCart(item.produce_id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
                                                <div className="flex items-center gap-2 border rounded-md p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.produce_id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.produce_id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock_available}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="text-xs text-muted-foreground/70 ml-1">{item.stock_unit || 'units'}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground">Price: KES {item.unit_price}</div>
                                                    <div className="font-bold">Total: KES {(item.unit_price * item.quantity).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Items ({totalItems})</span>
                                        <span>KES {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                        <span>Total Amount</span>
                                        <span className="text-success">KES {totalPrice.toLocaleString()}</span>
                                    </div>

                                    <div className="pt-4 space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">M-Pesa Phone Number</label>
                                        <Input
                                            id="phone"
                                            placeholder="e.g., 0712345678"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <p className="text-[10px] text-muted-foreground">We will send an STK push to this number for payment.</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full bg-success hover:bg-success/90 text-success-foreground"
                                        size="lg"
                                        onClick={handleCheckout}
                                    >
                                        Checkout & Pay
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                onStatusSelected={handlePaymentStatus}
                totalAmount={totalPrice}
                phoneNumber={phoneNumber}
            />
        </AppLayout>
    );
}
