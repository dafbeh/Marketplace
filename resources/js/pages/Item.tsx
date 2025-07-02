import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item',
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
                <div className='p-3 w-18'>
                  <Link href="/dashboard">
                    <ArrowLeft size={44} className="bg-gray-900 hover:bg-gray-700 p-2 rounded-full" />
                  </Link>
                </div>
                <div className="flex items-center flex-col w-full h-full">
                    <h1 className="font-bold text-3xl pb-2">{item.name}</h1>
                    <img src={item?.image_url || 'https://port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png'} alt={item.name} 
                        className="h-1/3 w-1/3 object-cover rounded-lg object-contain" />
                    <span className="text-gray-500 w-1/3 pt-3 text-1xl pb-2">{item.description}</span>
                </div>
            </AppLayout>
        </div>
    );
}