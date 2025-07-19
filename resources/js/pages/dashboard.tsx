import React from 'react';
import { ItemBox } from '@/components/ui/items';
import { AddItem } from '@/components/ui/add-item';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Item } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AddItemMod from '@/pages/Create';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type PageProps = {
  items: Item[];
  user: {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
  };
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { items, user } = usePage<PageProps>().props;
  const [ data, setData ] = React.useState([]);

  const apiKey = "ot64W5D9HQ0JTBsqmZOqibjMUrPvZFUT"
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForCollection`;

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(baseURL,
          {
            params: {
              collectionSlug: 'proof-moonbirds',
              withMetadata: true
            }
          }
        );
        setData(response.nfts);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <AddItemMod isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                    2xl:grid-cols-7 3xl:grid-cols-20">
                    {!!user?.is_admin && (
                      <div
                      className="relative aspect-[4/6] rounded-xl border hover:scale-102 ease-in-out transition duration-300 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                      >
                        <AddItem />
                      </div>
                    )}
                    {data.map(item => (
                      <div
                        key={item.tokenId}
                        className="relative aspect-[4/6] cursor-pointer rounded-lg
                         hover:scale-102 ease-in-out transition duration-300 border-1 border-gray-900"
                      >
                        <img src={ item.image.cachedUrl }></img>
                        <span> {item.attributes?.value ?? "N/A"} </span>
                    </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}