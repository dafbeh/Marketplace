import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Bookmark } from 'lucide-react';
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
  favourited: boolean;
}

export default function Item({ address, id, favourited }: Item) {

  console.log(favourited);

  interface NFTData {
    collection?: {
      name?: string;
      slug?: string;
    };
    contract?: {
      address: string;
    }
    image?: {
      cachedUrl: string;
    }
  }

  const [ data, setData ] = React.useState<NFTData>({});
  const [ isLoaded, setIsLoaded ] = React.useState(false);

  const apiKey = import.meta.env.VITE_ALCHEMY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTMetadata`;

  const handleImageLoad = (): any => {
    setIsLoaded(true);
  }

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
            <Link href={"/collection/" + data.collection?.slug}>
              <ArrowLeft size={44} color="#ffffff" className="p-2 hover:scale-120 transition-all duration-300 rounded-lg" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center h-full px-3 md:pr-20">
          <div className="md:flex">
            <div className='md:w-[500px] md:h-[300px] p-1 md:p-0'>
              <img onLoad={handleImageLoad} src={data.image?.cachedUrl} 
                  className="object-cover object-contain pb-4" />
            </div>
            <div className="md:px-5 md:py-3 pb-30">
              <h1 className="font-bold text-3xl pb-2 p-1 md:p-0">{ data.collection?.name } #{id}</h1>
              <p className="break-all text-gray-500 pt-3 text-base w-full">
                {address}
              </p>
            </div>
            <form method="POST" action={`/items/buy/${data.contract?.address}`}>
              <input
                type="hidden"
                name="_token"
                value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
              />
              <input type="hidden" name="item_id" value={id} />
              <input type="hidden" name="total_price" value="55" />                    
            </form>
          </div>
        </div>
        <div className='fixed bottom-5 right-5 flex'>
          <div className='rounded-xl flex overflow-hidden hover:scale-102 gap-2 p-2
              transition-all duration-300 bg-muted ring-1 ring-gray-100/50'>
            <button className="bg-blue-400 p-3 px-10 rounded-lg 
                text-black font-bold select-none duration-200 transition-all
                hover:bg-blue-300 hover:shadow-md shadow-blue-800 
                cursor-pointer">
                  Buy
            </button>
            <div
              onClick={() =>
                router.post('/items/favourites', {
                  address: address,
                  name: data.collection?.name,
                  nft_id: id,
                  image_url: data.image.cachedUrl,
                })
              }>
              {favourited && 
                <Bookmark size={48} color="#000000ff" className="bg-yellow-600 p-3 rounded-lg 
                  text-black font-bold select-none duration-200 transition-all
                  hover:bg-red-300 hover:shadow-md shadow-yellow-800 
                  cursor-pointer" />
              }
              {!favourited && 
                <Bookmark size={48} color="#fafafa" className="p-3 rounded-lg 
                  text-black font-bold select-none duration-200 transition-all
                  hover:bg-yellow-600 hover:shadow-md shadow-yellow-800 
                  cursor-pointer" />
              }
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}