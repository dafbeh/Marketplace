import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import React, { useEffect } from 'react';
import axios from 'axios';
import SilverButton from '@/components/ui/silver-button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DropDown } from "@/components/date-dropdown"
import { CreateTable } from "@/components/table"

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
  slug: string;
}

export default function Item({ address, id, favourited, slug }: Item) {
  interface NFTData {
    nft?: {
      name?: string;
      slug?: string;
      image_url?: string;
      description?: string;
      traits?: any;
      collection?: string;
    };
    total?: {
      floor_price?: string;
      average_price?: string;
      num_owners?: number;
    };
    intervals?: {
      average_price?: number;
      sales?: number;
      volume?: number;
    }[];
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
  const [ stats, setStats ] = React.useState<NFTData>({});
  const [position, setPosition] = React.useState("0")
  const[ name, setName ] = React.useState('');
  const[ alert, setAlert ] = React.useState(false);
  const apiKey = import.meta.env.VITE_OPENSEA;
  const baseURL = `https://api.opensea.io/api/v2/chain/ethereum/contract/${address}/nfts/${id}`;
  const headers = {
    'X-API-KEY': apiKey,
  };

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
        const { data: response } = await axios.get(baseURL, {
          headers,
        });
        setData(response);
        setName(response.nft?.name || '');
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const baseURL2 = `https://api.opensea.io/api/v2/collections/${slug}/stats`;
    useEffect(() => {
    const fetchData = async () =>{
      try {
        const { data: response } = await axios.get(baseURL2, {
          headers,
        });
        setStats(response);

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
            <Link href={"/collection/" + data.nft?.collection}>
              <ArrowLeft size={44} color="#ffffff" className="p-2 hover:scale-120 transition-all duration-300 rounded-lg" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center h-full px-3 md:pr-20">
          <div className="md:flex">
            <div className='md:w-[500px] md:h-[300px] p-1 md:p-0'>
              <img src={data.nft?.image_url} 
                  className="rounded-lg" />
            </div>
            <div className="md:px-5 md:py-3 pb-30 min-w-98">
              <h1 className="font-bold text-3xl p-1 md:p-0">{ data.nft?.name || data.nft?.collection + " #" + id }</h1>
              <div className="flex">
              <SilverButton text={
                <span className="flex items-center justify-center gap-1">
                  {ethSVG}
                  {stats.total?.floor_price ?? 'No Price'}
                </span>
              } header={'Floor Price:'} />
              <SilverButton text={
                <span className="flex items-center justify-center gap-1">
                  {stats.total?.num_owners || 'n/a'}
                </span>
              } header={'Owners:'} />
              </div>
              <Accordion type="single" collapsible className='md:max-w-88 w-full'>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {data.nft?.description || 'No description available.'}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Properties</AccordionTrigger>
                  <AccordionContent>
                    {data.nft?.traits.map((attr: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{attr.trait_type}:</span>
                        <span>{attr.value}</span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>NFT Data</AccordionTrigger>
                  <AccordionContent>
                    <b>Address:</b> {address} <br />
                    <b>ID:</b> {id}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Sale Stats</AccordionTrigger>
                  <AccordionContent>
                    <CreateTable 
                      averagePrice={stats.intervals?.[Number(position)]?.average_price} 
                      sales={stats.intervals?.[Number(position)]?.sales} 
                      volume={stats.intervals?.[Number(position)]?.volume}>
                    </CreateTable>
                    <div className="flex w-full justify-end pt-3">
                      <DropDown value={position} onChange={setPosition} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className='fixed bottom-5 right-5 flex'>
          <div className='rounded-lg flex overflow-hidden hover:scale-102 gap-2 p-2
              transition-all duration-300 ring-2 ring-gray-100/20'>
              <form method="POST" action={`/items/buy/${address}`}>
              <input
                type="hidden"
                name="_token"
                value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
              />
              <input type="hidden" name="item_id" value={id} />
              <input type="hidden" name="total_price" value="55" />                    
              <button className="bg-blue-400 p-3 px-10 rounded-lg 
                text-black font-bold select-none duration-200 transition-all
                hover:bg-blue-300 hover:shadow-md shadow-blue-800 
                cursor-pointer">
                  Buy
              </button>
              </form>
            <div
              onClick={() =>
                router.post('/items/favourites', {
                  address: address,
                  name: data.nft?.name,
                  slug: data.nft?.collection,
                  nft_id: id,
                  image_url: data.nft?.image_url,
                }, {
                  onSuccess: () => {
                    setAlert(true);
                  }
                })
              }>
              {favourited && 
                <Bookmark size={48} color="#fafafa" className="bg-yellow-600 p-3 rounded-lg 
                  text-black font-bold select-none duration-200 transition-all
                  hover:bg-red-300 hover:shadow-md shadow-yellow-800 
                  cursor-pointer" />
              }
              {!favourited && 
                <Bookmark size={48} color="#fafafa" className="dark:bg-white/0 bg-gray-700 p-3 rounded-lg 
                  text-black font-bold select-none duration-200 transition-all dark:hover:bg-yellow-600
                  hover:shadow-md dark:shadow-yellow-800 shadow-gray-800
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