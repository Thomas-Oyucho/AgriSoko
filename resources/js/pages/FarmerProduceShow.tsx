import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Produce } from '@/types/produce';

interface Props {
    produce: Produce;
}

export default function FarmerProduceShow({ produce }: Props) {
    return (
        <AppLayout>
            <Head title={`View ${produce.name}`} />
            <div className="max-w-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{produce.name}</h1>
                    <div className="space-x-2">
                        <Link href={`/farmer/produce/${produce.id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                        <Link href="/farmer/produce">
                            <Button variant="outline">Back to List</Button>
                        </Link>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <strong>Category:</strong> {produce.category.category_name}
                    </div>
                    <div>
                        <strong>Price:</strong> ${produce.price}
                    </div>
                    <div>
                        <strong>Quantity Available:</strong> {produce.quantity_available}
                    </div>
                    {produce.picture && (
                        <div>
                            <strong>Picture:</strong>
                            <img src={produce.picture} alt={produce.name} className="max-w-xs mt-2" />
                        </div>
                    )}
                    {produce.description && (
                        <div>
                            <strong>Description:</strong>
                            <p className="mt-2">{produce.description}</p>
                        </div>
                    )}
                    <div>
                        <strong>Date Listed:</strong> {new Date(produce.date_listed).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}