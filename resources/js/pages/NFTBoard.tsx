import React from 'react';
import { ItemBox } from '@/components/ui/items';
import ItemSkeleton from '@/components/ui/ItemSkeleton';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Collection',
        href: '/dashboard/Collection',
    },
];

type PageProps = {
  id: string;
  user: {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
  };
};

export default function NFTBoard( id : PageProps ) {
  const [isLoading, setIsLoading] = React.useState(true);
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
              collectionSlug: id.id,
              withMetadata: true
            }
          }
        );
        setIsLoading(false);
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
          <Head title="Collection" />
          <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                  2xl:grid-cols-7 3xl:grid-cols-20">
                {isLoading && <ItemSkeleton cards={30} />}
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