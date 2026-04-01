import { Head, useForm } from '@inertiajs/react';
import { type FormEvent, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Produce, ProduceCategory } from '@/types/produce';

interface Props {
    produce?: Produce | null;
    categories: ProduceCategory[];
}

const UNITS = [
    { label: 'per kg', value: 'per kg' },
    { label: 'per piece', value: 'per piece' },
    { label: 'per bunch', value: 'per bunch' },
];

export default function FarmerProduceForm({
    produce = null,
    categories,
}: Props) {
    const editing = Boolean(produce);
    const [preview, setPreview] = useState<string | null>(
        produce?.picture || null,
    );

    const form = useForm<{
        name: string;
        category_id: string | number;
        price: string | number;
        quantity_available: string | number;
        stock_unit: string;
        price_unit: string;
        picture: File | string | null;
        description: string;
        allow_farm_visits: boolean;
        _method?: string;
    }>({
        name: produce?.name || '',
        category_id: produce?.category_id || '',
        price: produce?.price || '',
        quantity_available: produce?.quantity_available || '',
        stock_unit: produce?.stock_unit || '',
        price_unit: produce?.price_unit || '',
        picture: null,
        description: produce?.description || '',
        allow_farm_visits: produce?.allow_farm_visits || false,
    });

    useEffect(() => {
        if (form.data.stock_unit) {
            form.setData('price_unit', form.data.stock_unit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.data.stock_unit]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editing && produce) {
            // Use POST with _method=PUT for file uploads in Laravel
            form.transform((data) => ({
                ...data,
                _method: 'PUT',
            }));

            form.post(`/farmer/produce/${produce.id}`, {
                forceFormData: true,
            });

            return;
        }

        form.post('/farmer/produce');
    };

    return (
        <AppLayout>
            <Head title={editing ? 'Edit produce' : 'New produce'} />
            <div className="max-w-3xl mx-auto p-6 bg-card border border-border rounded-xl shadow-sm mt-8">
                <h1 className="mb-6 text-2xl font-bold text-foreground">
                    Product Information
                </h1>
                <form onSubmit={submit} className="space-y-6">
                    {/* Image row */}
                    <div className="grid gap-2">
                        <Label htmlFor="picture">Product Image (Optional)</Label>
                        {preview && (
                            <div className="mb-2 relative w-32 h-32">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                    onClick={() => {
                                        setPreview(null);
                                        form.setData('picture', null);
                                    }}
                                >
                                    ×
                                </Button>
                            </div>
                        )}
                        <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    form.setData('picture', file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setPreview(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <InputError message={form.errors.picture} />
                        <p className="text-xs text-muted-foreground">
                            Max size: 2MB. Format: JPG, PNG, WEBP.
                        </p>
                    </div>

                    {/* Row 1: Name and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="e.g., Fresh Strawberries"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Category *</Label>
                            <Select
                                value={form.data.category_id?.toString()}
                                onValueChange={(value) =>
                                    form.setData('category_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose plant category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem
                                            key={c.id}
                                            value={c.id.toString()}
                                        >
                                            {c.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.category_id} />
                        </div>
                    </div>

                    {/* Row 2: Stock Quantity and Units */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity_available">
                                Stock Quantity *
                            </Label>
                            <Input
                                id="quantity_available"
                                type="number"
                                placeholder="100"
                                value={form.data.quantity_available}
                                onChange={(e) =>
                                    form.setData(
                                        'quantity_available',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError message={form.errors.quantity_available} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Stock Unit</Label>
                            <Select
                                value={form.data.stock_unit}
                                onValueChange={(value) =>
                                    form.setData('stock_unit', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {UNITS.map((u) => (
                                        <SelectItem key={u.value} value={u.value}>
                                            {u.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.stock_unit} />
                        </div>
                    </div>

                    {/* Row 3: Description */}
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            className="min-h-[120px]"
                            placeholder="Describe your product, growing methods, freshness, etc."
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            required
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    {/* Row 4: Price and Price per Unit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (KSh) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="500"
                                value={form.data.price}
                                onChange={(e) =>
                                    form.setData('price', e.target.value)
                                }
                                required
                            />
                            <InputError message={form.errors.price} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Price Unit</Label>
                            <Select
                                value={form.data.price_unit}
                                onValueChange={(value) =>
                                    form.setData('price_unit', value)
                                }
                                disabled={Boolean(form.data.stock_unit)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {UNITS.map((u) => (
                                        <SelectItem key={u.value} value={u.value}>
                                            {u.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.price_unit} />
                        </div>
                    </div>

                    {/* Row 5: Farm visits */}
                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox
                            id="allow_farm_visits"
                            checked={form.data.allow_farm_visits}
                            onCheckedChange={(checked) =>
                                form.setData('allow_farm_visits', checked === true)
                            }
                        />
                        <Label
                            htmlFor="allow_farm_visits"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Allow customers to book farm visits for this product
                        </Label>
                        <InputError message={form.errors.allow_farm_visits} />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full md:w-auto px-8" disabled={form.processing}>
                            {editing ? 'Save Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
