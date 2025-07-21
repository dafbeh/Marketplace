import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item',
        href: '/items',
    },
];

interface Item {
  address: string;
  id: number;
}

export default function Item({ address, id }: Item) {

  interface NFTData {
    collection?: {
      name?: string;
    };
    contract?: {
      address: string;
    }
    image?: {
      cachedUrl: string;
    }
  }

  const [ data, setData ] = React.useState<NFTData>({});

  const apiKey = import.meta.env.VITE_ALCHEMY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTMetadata`;

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(baseURL,
          {
            params: {
              contractAddress: address,
              tokenId: id
            }
          }
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="hi" />
                <div className="flex justify-between">
                  <div className='p-3 w-18'>
                    <Link href="/dashboard">
                      <ArrowLeft size={44} className="bg-gray-900 hover:bg-gray-700 p-2 rounded-full" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-center flex-col w-full h-full">
                    <h1 className="font-bold text-3xl pb-2">{ data.collection?.name }</h1>
                    <img src={data.image?.cachedUrl || 'https://port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png'} 
                        className="w-[500px] object-cover rounded-lg object-contain" />
                    <span className="text-gray-500 w-[500px] pt-3 text-1xl pb-2">Address: {data.contract?.address}</span>
                    <form method="POST" action={`/items/buy/${data.contract?.address}`}>
                      <input
                        type="hidden"
                        name="_token"
                        value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
                      />
                      <input type="hidden" name="item_id" value={id} />
                      <input type="hidden" name="total_price" value="55" />
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