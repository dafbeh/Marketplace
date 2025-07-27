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
                    <div key={`${item.address}-${item.nft_id}`} 
                            className="mb-4 p-4 border rounded hover:bg-muted/50 cursor-pointer"
                            onClick={() => router.visit(`/items/${item.address}/${item.nft_id}`)}>
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <img className="w-12 h-12 rounded-full" src={item.image_url}></img>
                                <div className="pl-3">
                                    <h3 className="text-lg font-semibold">{item.name || "Unknown"}</h3>
                                    <div className="flex">
                                        <p className="text-gray-600">{item.address}</p>
                                        <p className="text-white/80">&nbsp; / &nbsp;</p>
                                        <p className="text-gray-600">{item.nft_id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}