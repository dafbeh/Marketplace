import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import React, { useEffect } from 'react';
import axios from 'axios';
import { set } from 'nprogress';
import SilverButton from '@/components/ui/silver-button'

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
  interface NFTData {
    collection?: {
      name?: string;
      slug?: string;
    };
    contract?: {
      address: string;
      openSeaMetadata?: {
        description?: string;
        floorPrice?: number;
      };
    }
    image?: {
      cachedUrl: string;
    }
  }

  const ethSVG = (
    <svg className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" 
        image-rendering="optimizeQuality" shape-rendering="geometricPrecision" 
        text-rendering="geometricPrecision" viewBox="0 0 784.37 1277.39"><g fill-rule="nonzero">
          <path fill="#ffffffff" d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"/>
          <path fill="#8C8C8C" d="M392.07 0 0 650.54l392.07 231.75V472.33z"/>
          <path fill="#ffffffff" d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"/>
          <path fill="#8C8C8C" d="M392.07 1277.38V956.52L0 724.89z"/>
          <path fill="#141414" d="m392.07 882.29 392.06-231.75-392.06-178.21z"/>
          <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z"/></g>
    </svg>
  )

  const [ data, setData ] = React.useState<NFTData>({});
  const [ isLoaded, setIsLoaded ] = React.useState(false);
  const[ name, setName ] = React.useState('');
  const[ alert, setAlert ] = React.useState(false);

  const apiKey = import.meta.env.VITE_ALCHEMY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTMetadata`;

  const handleImageLoad = (): any => {
    setIsLoaded(true);
  }

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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
        setName(response.collection?.name || '');
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
              <h1 className="font-bold text-3xl p-1 md:p-0">{ data.collection?.name } #{id}</h1>
              <SilverButton text={
                <span className="flex items-center justify-center gap-1">
                  {ethSVG}
                  {data.contract?.openSeaMetadata?.floorPrice ?? 'No Price'}
                </span>
              } />
              <p className="text-gray-500 text-base max-w-96">
                {data.contract?.openSeaMetadata?.description || 'No description available.'}
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
                }, {
                  onSuccess: () => {
                    setAlert(true);
                  }
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
            <Alert className={`md:max-w-sm max-w-[calc(100vw-28px)] mx-auto fixed top-4 right-4 
              transition-all duration-300 ease-in-out transform ${
              alert ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
            }`}>
            <CheckCircle2Icon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription className={!favourited ? "text-red-500" : "text-gray-500"}>
              {favourited ? 'You have favourited ' + name + ' #' + id + '.' : 'You have unfavourited ' + name + ' #' + id + '.'}
            </AlertDescription>
            </Alert>
      </AppLayout>
    </div>
  );
}