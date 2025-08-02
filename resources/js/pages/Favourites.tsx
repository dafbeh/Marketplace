import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Favourites',
        href: '/favourites',
    },
];

export default function Favourites({ items } : any) {
    useEffect(() => {
        router.reload({ only: ['items'] });
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Favourites" />
            <div className="p-5 overflow-y-auto">
                {items.map((item: any) => (
                    <div key={`${item.address}-${item.nft_id}`} 
                            className="mb-4 p-4 border rounded hover:bg-muted/50 cursor-pointer"
                            onClick={() => router.visit(`/items/${item.address}/${item.nft_id}`)}>
                        <div className="flex">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <img className="w-12 h-12 rounded-full" src={item.image_url}></img>
                                    <div className="pl-3">
                                        <h3 className="text-lg font-semibold">{item.name || "Unknown"}</h3>
                                        <div className="flex break-all">
                                        </div>
                                        <span className="text-gray-600"> #{item.nft_id}</span>
                                    </div>
                                </div>
                                <button
                                    className="bg-red-500/70 hover:bg-red-600/70 p-3 cursor-pointer rounded-lg"
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (window.confirm('Are you sure you want to remove this item from favourites?')) {
                                            router.delete(route('favourites.delete', item.favourite_id));
                                        }
                                    }}
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}