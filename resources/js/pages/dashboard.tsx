import React from 'react';
import { ItemBox } from '@/components/ui/items';
import { AddItem } from '@/components/ui/add-item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AddItemMod from '@/pages/Create';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
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
  sku?: string;
};

type PageProps = {
  items: Item[];
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { items } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <AddItemMod isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-20">
                    <div className="relative aspect-[4/6] rounded-xl border hover:scale-102 ease-in-out transition duration-300">
                      <div
                      className="relative aspect-[4/6] rounded-xl border hover:scale-102 ease-in-out transition duration-300 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                      >
                        <AddItem />
                      </div>
                    </div>
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="relative aspect-[4/6] cursor-pointer rounded-xl border hover:scale-102 ease-in-out transition duration-300"
                      >
                        <Link href={`/items/${item.id}`}>
                          <ItemBox className="" item={item} />
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
