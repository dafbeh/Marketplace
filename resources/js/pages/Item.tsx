import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { MenuItems } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    },
];

type Item = {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  image_url?: string;
};

type ItemProps = {
  item: Item;
};

export default function Item({ item }: ItemProps) {

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={item.name} />
                <div>
                    <h1 className="font-bold text-2xl p-3">{item.name}</h1>
                </div>
            </AppLayout>
        </div>
    );
}