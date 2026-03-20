import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Produce, ProduceCategory } from '@/types/produce';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    });

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            form.put(`/farmer/produce/${produce.id}`);
        } else {
            form.post('/farmer/produce');
        }
    };

    return (
        <AppLayout>
            <Head title={editing ? 'Edit produce' : 'New produce'} />
            <div className="max-w-xl p-4">
                <h1 className="mb-4 text-2xl font-bold">
                    {editing ? 'Edit produce' : 'List new produce'}
                </h1>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            required
                        />
                        <InputError message={form.errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Category</Label>

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

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={form.data.price}
                            onChange={(e) =>
                                form.setData('price', e.target.value)
                            }
                            required
                        />
                        <InputError message={form.errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="quantity_available">
                            Quantity available
                        </Label>
                        <Input
                            id="quantity_available"
                            type="number"
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
                        <Label htmlFor="picture">Picture URL</Label>
                        <Input
                            id="picture"
                            type="text"
                            value={form.data.picture}
                            onChange={(e) =>
                                form.setData('picture', e.target.value)
                            }
                        />
                        <InputError message={form.errors.picture} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {editing ? 'Save' : 'Create'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
