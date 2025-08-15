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

interface MyNftProps {
  input: string;
}

export default function MyNft({ input }: MyNftProps) {
    const initialAddress = input;
    const [ data, setData ] = React.useState<any[]>([]);
    const [ address, setAddress ] = React.useState("");
    const [ debouncedAddress, setDebouncedAddress ] = React.useState(initialAddress);

    const apiKey = import.meta.env.VITE_OPENSEA;
    const headers = {
      'X-API-KEY': apiKey,
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedAddress(address);
        }, 500);   
        return () => {
            clearTimeout(handler);
        };
    }, [address]);

    useEffect(() => {
    const fetchData = async () =>{
        try {
            if(debouncedAddress.length == 42) {  
                const baseURL = `https://api.opensea.io/api/v2/chain/ethereum/account/${debouncedAddress}/nfts`;
                const { data: response } = await axios.get(baseURL, {
                  headers,
                  params: {
                    limit: 200,
                  },
                });
                if(input) {
                    setDebouncedAddress(input);
                }

                setData(response.nfts);
                console.log(response.nfts);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
        fetchData();
    }, [debouncedAddress]);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Nfts" />
            <div className="p-4 w-full md:max-w-sm items-center gap-3">
              <Input 
                placeholder={input ? input : "Address ID"} 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 px-4 overflow-hidden">
              <div className="grid auto-rows-min gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-4 
                  2xl:grid-cols-7 3xl:grid-cols-20">
                {data.length > 0 ? data.map(item => (
                  <div
                    key={item.identifier + item.identifier}
                    className="bg-mute/50 ring-1 ring-white/20 relative aspect-[5/6] cursor-pointer rounded-lg
                      ease-in-out transition duration-300 border-1 border-gray-900"
                  >
                  <ItemBox id={item.identifier} address={item.contract} image={item.image_url} slug={item.collection} />
                </div>
                )) : (
                <div className="text-gray-500">
                  <span>{address.length != 42 ? "User has no NFTs" : "Please enter an address"}</span>
                </div>
                )}
              </div>
          </div>
        </AppLayout>
    )
}