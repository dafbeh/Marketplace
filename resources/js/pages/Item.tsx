import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import axios from 'axios';

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
                        className="w-[500px] object-cover rounded-lg object-contain" />
                    <span className="text-gray-500 w-[500px] pt-3 text-1xl pb-2">{item.description}</span>
                    <form method="POST" action={`/items/buy/${item.id}`}>
                      <input
                        type="hidden"
                        name="_token"
                        value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
                      />
                      <input type="hidden" name="item_id" value={item.id} />
                      <input type="hidden" name="total_price" value={item.price} />
                      <button className="bg-green-400 p-3 px-10 rounded-lg 
                          text-black font-bold select-none duration-300 transition-all
                          hover:bg-green-300 hover:scale-105 hover:shadow-xl shadow-green-800 
                          cursor-pointer">
                            Buy
                      </button>
                    </form>
                </div>
            </AppLayout>
        </div>
    );
}