import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

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
    function handleDelete(orderId: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(`/orders/delete/${orderId}`);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Previous Orders" />
            <div className="p-5 overflow-y-auto">
                {orders.map((order) => (
                    <div key={order.id} className="mb-4 p-4 border rounded">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{order.item_name}</h3>
                                <p className="text-gray-600">Price: ${order.item_price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(order.id)}
                                className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}