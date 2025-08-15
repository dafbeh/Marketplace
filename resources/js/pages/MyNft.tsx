import AppLayout from '@/layouts/app-layout';
import React, { useEffect } from 'react';
import axios from 'axios';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Input } from "@/components/ui/input"
import { ItemBox } from '@/components/ui/items';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'MyNfts',
        href: '/MyNft',
    },
];

export default function MyNft() {
    const [ data, setData ] = React.useState<any[]>([]);
    const [ address, setAddress ] = React.useState("0x4459084da2d3a774c436f2e75f2e3fe9335dc5de");

    const apiKey = import.meta.env.VITE_OPENSEA;
    const baseURL = `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`;
    const headers = {
      'X-API-KEY': apiKey,
    };

    useEffect(() => {
      const fetchData = async () =>{
        try {
          const { data: response } = await axios.get(baseURL, {
            headers,
            params: {
              limit: 200,
            },
          });
          setData(response.nfts);
          console.log(response.nfts);
        } catch (error) {
          console.error(error.message);
        }
      }

      fetchData();
    }, []);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Nfts" />
            <div className="p-4 w-full md:max-w-sm items-center gap-3">
              <Input 
                placeholder="Address ID" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 p-4 overflow-x-auto">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                  2xl:grid-cols-7 3xl:grid-cols-20">
                  {data.map(item => (
                    <div
                      key={item.identifier + item.identifier}
                      className="bg-mute/50 ring-1 ring-white/20 relative aspect-[5/6] cursor-pointer rounded-lg
                        ease-in-out transition duration-300 border-1 border-gray-900"
                    >
                    <ItemBox id={item.identifier} address={item.contract} image={item.image_url} slug={item.collection} />
                  
                  </div>
                  ))}
              </div>
          </div>
        </AppLayout>
    )
}