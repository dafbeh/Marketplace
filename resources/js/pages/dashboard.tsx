import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ItemBox } from '@/components/ui/items';
import { AddItem } from '@/components/ui/add-item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-20">
                    <div className="relative aspect-[4/6] rounded-xl border hover:scale-102 ease-in-out transition duration-300">
                        <AddItem className="" />
                    </div>
                    <div className="relative aspect-[4/6] cursor-pointer rounded-xl border hover:scale-102 ease-in-out transition duration-300">
                        <ItemBox className="" />
                    </div>
                    <div className="relative aspect-[4/6] cursor-pointer rounded-xl border hover:scale-102 ease-in-out transition duration-300">
                        <ItemBox className="" />
                    </div>
                    <div className="relative aspect-[4/6] cursor-pointer rounded-xl border hover:scale-102 ease-in-out transition duration-300">
                        <ItemBox className="" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
