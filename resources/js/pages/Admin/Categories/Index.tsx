import { Head, useForm } from '@inertiajs/react';
import { Edit, Trash, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    category_name: string;
    description: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Categories', href: '/admin/categories' },
];

export default function CategoryIndex({ categories }: Props) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const { data, setData, post, patch, delete: destroy, processing, reset, errors } = useForm({
        category_name: '',
        description: '',
    });

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setData({
            category_name: category.category_name,
            description: category.description || '',
        });
    };

    const handleCancel = () => {
        setEditingCategory(null);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            patch(`/admin/categories/${editingCategory.id}`, {
                onSuccess: () => {
                    setEditingCategory(null);
                    reset();
                }
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => reset()
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(`/admin/categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Categories" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category_name">Category Name</Label>
                                        <Input
                                            id="category_name"
                                            value={data.category_name}
                                            onChange={(e) => setData('category_name', e.target.value)}
                                            required
                                        />
                                        {errors.category_name && <p className="text-sm text-red-500">{errors.category_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                                            {editingCategory ? 'Update Category' : <><Plus className="mr-2 h-4 w-4" /> Create Category</>}
                                        </Button>
                                        {editingCategory && (
                                            <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categories.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell className="font-medium">{category.category_name}</TableCell>
                                                <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(category)}>
                                                            <Edit className="h-4 w-4 text-emerald-600" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" onClick={() => handleDelete(category.id)}>
                                                            <Trash className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
