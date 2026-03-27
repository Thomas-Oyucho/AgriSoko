import { Head, useForm } from '@inertiajs/react';
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

export default function FarmerProduceForm({
    produce = null,
    categories,
}: Props) {
    const editing = Boolean(produce);
    const form = useForm({
        name: produce?.name || '',
        category_id: produce?.category_id || '',
        price: produce?.price || '',
        quantity_available: produce?.quantity_available || '',
        picture: produce?.picture || '',
        description: produce?.description || '',
        weight_size: produce?.weight_size || '',
        unit: produce?.unit || 'per kg',
        allow_farm_visits: produce?.allow_farm_visits || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && produce) {
            form.put(`/farmer/produce/${produce.id}`);
        } else {
            form.post('/farmer/produce');
        }
    };

    const inputClasses = "bg-[#f1f5f9] border-none rounded-lg focus-visible:ring-1 focus-visible:ring-green-500 dark:bg-slate-800 dark:text-slate-100";

    return (
        <AppLayout>
            <Head title={editing ? 'Edit produce' : 'New produce'} />
            <div className="mx-auto max-w-4xl p-6">
                <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-950">
                    <h1 className="mb-8 text-2xl font-bold text-[#1e293b] dark:text-white">
                        Product Information
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                Product Name *
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="e.g., Fresh Strawberries"
                                className={inputClasses}
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label className="font-semibold text-[#1e293b] dark:text-slate-200">
                                    Category *
                                </Label>
                                <Select
                                    value={form.data.category_id?.toString()}
                                    onValueChange={(value) =>
                                        form.setData('category_id', value)
                                    }
                                >
                                    <SelectTrigger className={inputClasses}>
                                        <SelectValue placeholder="Fruit" />
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

                            <div className="grid gap-2">
                                <Label htmlFor="weight_size" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                    Weight/Size
                                </Label>
                                <Input
                                    id="weight_size"
                                    type="text"
                                    placeholder="e.g., 1kg, Large"
                                    className={inputClasses}
                                    value={form.data.weight_size}
                                    onChange={(e) =>
                                        form.setData('weight_size', e.target.value)
                                    }
                                />
                                <InputError message={form.errors.weight_size} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                Description *
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your product, growing methods, freshness, etc."
                                className={`${inputClasses} min-h-[150px] resize-none`}
                                value={form.data.description}
                                onChange={(e) =>
                                    form.setData('description', e.target.value)
                                }
                                required
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                    Price (KSh) *
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="500"
                                    className={inputClasses}
                                    value={form.data.price}
                                    onChange={(e) =>
                                        form.setData('price', e.target.value)
                                    }
                                    required
                                />
                                <InputError message={form.errors.price} />
                            </div>

                            <div className="grid gap-2">
                                <Label className="font-semibold text-[#1e293b] dark:text-slate-200">
                                    Unit
                                </Label>
                                <Select
                                    value={form.data.unit}
                                    onValueChange={(value) =>
                                        form.setData('unit', value)
                                    }
                                >
                                    <SelectTrigger className={inputClasses}>
                                        <SelectValue placeholder="per kg" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="per kg">per kg</SelectItem>
                                        <SelectItem value="per bunch">per bunch</SelectItem>
                                        <SelectItem value="per piece">per piece</SelectItem>
                                        <SelectItem value="per tray">per tray</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.unit} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="quantity_available" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                    Stock Quantity *
                                </Label>
                                <Input
                                    id="quantity_available"
                                    type="number"
                                    placeholder="100"
                                    className={inputClasses}
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
                        </div>

                        <div className="flex items-center space-x-2 py-2">
                            <Checkbox
                                id="allow_farm_visits"
                                checked={form.data.allow_farm_visits}
                                onCheckedChange={(checked) =>
                                    form.setData('allow_farm_visits', checked as boolean)
                                }
                            />
                            <Label
                                htmlFor="allow_farm_visits"
                                className="text-sm font-medium leading-none text-[#1e293b] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-200"
                            >
                                Allow customers to book farm visits for this product
                            </Label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="picture" className="font-semibold text-[#1e293b] dark:text-slate-200">
                                Picture URL
                            </Label>
                            <Input
                                id="picture"
                                type="text"
                                placeholder="https://example.com/picture.jpg"
                                className={inputClasses}
                                value={form.data.picture}
                                onChange={(e) =>
                                    form.setData('picture', e.target.value)
                                }
                            />
                            <InputError message={form.errors.picture} />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="bg-[#22c55e] px-8 py-6 text-lg font-semibold hover:bg-[#16a34a]"
                            >
                                {editing ? 'Save Product' : 'List Product'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
