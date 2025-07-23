import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Favourites',
        href: '/favourites',
    },
];

export default function Favourites({ items } : any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Favourites" />
            <div className="p-5 overflow-y-auto">
                {items.map((item: any) => (
                    <div key={`${item.address}-${item.nft_id}`} className="mb-4 p-4 border rounded">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Contract: {item.address}</h3>
                                <p className="text-gray-600">Token ID: {item.nft_id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}