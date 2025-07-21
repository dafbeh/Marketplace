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
        title: 'NFT',
        href: '/nft',
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

export default function NFTBoard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { user } = usePage<PageProps>().props;
  const [ data, setData ] = React.useState([]);

  const apiKey = import.meta.env.VITE_ALCHEMY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForCollection`;

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(baseURL,
          {
            params: {
              collectionSlug: 'rektguy',
              withMetadata: true
            }
          }
        );
        setData(response.nfts);
        console.log(response.nfts);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="NFT" />
          <AddItemMod isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                  2xl:grid-cols-7 3xl:grid-cols-20">
                  {!!user?.is_admin && (
                    <div
                    className="relative aspect-[5/6] rounded-xl border hover:scale-102 ease-in-out transition duration-300 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                    >
                      <AddItem />
                    </div>
                  )}
                  {data.map(item => (
                    <div
                      key={item.tokenId}
                      className="bg-gray-800/80 relative aspect-[5/6] cursor-pointer rounded-lg
                        ease-in-out transition duration-300 border-1 border-gray-900"
                    >
                    
                    <ItemBox id={item.tokenId} address={item.contract.address} image={item.image.cachedUrl} price={item.contract.openSeaMetadata?.floorPrice} />
                  </div>
                  ))}
              </div>
          </div>
      </AppLayout>
  );
}