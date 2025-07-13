import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Previous Orders',
        href: '/orders',
    },
];

interface Order {
    id: number;
    item_name: string;
    item_price: number;
}

export default function PreviousOrders({ orders }: { orders: Order[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Previous Orders" />
            <div className="p-5 overflow-y-auto">
                {orders.map((order) => (
                    <div key={order.id} className="mb-4 p-4 border rounded">
                        <h3 className="text-lg font-semibold">{order.item_name}</h3>
                        <p className="text-gray-600">Price: ${order.item_price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}