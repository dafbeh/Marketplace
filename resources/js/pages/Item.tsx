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
}

export default function Item({ address, id }: Item) {

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
        <div className="flex flex-col items-center h-full px-3">
          <div className="flex">
            <div className='w-[500px] h-[300px]'>
              {!isLoaded && (
                <div role="status" className='flex justify-center py-30'>
                  <svg aria-hidden="true" className="w-8 h-8 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
              )}
              <img onLoad={handleImageLoad} src={data.image?.cachedUrl} 
                  className="object-cover object-contain" />
            </div>
            <div className="px-5 py-3">
              <h1 className="font-bold text-3xl pb-2">{ data.collection?.name } #{id}</h1>
              <span className="text-gray-500 pt-3 text-1xl">{address}</span>
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
                <Bookmark size={48} color="#000000ff" className="bg-yellow-400 p-3 rounded-lg 
                text-black font-bold select-none duration-200 transition-all
                hover:bg-yellow-300 hover:shadow-md shadow-yellow-800 
                cursor-pointer" />
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}