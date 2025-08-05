import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Favourites',
    href: '/favourites',
  },
];

export default function Favourites({ items }: any) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    router.reload({ only: ['items'] });
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Favourites" />
      <div className="p-5 overflow-y-auto">
        {items.map((item: any) => (
          <div key={`${item.address}-${item.nft_id}`}
            className="mb-4 p-4 border rounded hover:bg-muted/50 cursor-pointer"
            onClick={() => router.visit(`/items/${item.address}/${item.nft_id}`)}>
            <div className="flex">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img className="w-12 h-12 rounded-full" src={item.image_url}></img>
                  <div className="pl-3">
                    <h3 className="text-lg font-semibold">{item.name || "Unknown"}</h3>
                    <div className="flex break-all">
                    </div>
                    <span className="text-gray-600"> #{item.nft_id}</span>
                  </div>
                </div>
                <button
                  className="bg-red-500/70 hover:bg-red-600/70 p-3 cursor-pointer rounded-lg"
                  onClick={e => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to remove this item from favourites?')) {
                      router.delete(route('favourites.delete', item.favourite_id));
                      setAlert(true);
                    }
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
          <Alert className={`md:max-w-sm max-w-[calc(100vw-28px)] mx-auto fixed top-4 right-4 
              transition-all duration-300 ease-in-out transform ${
              alert ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}>
            <CheckCircle2Icon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              You have removed an item from your favourites list.
            </AlertDescription>
          </Alert>
      </div>
    </AppLayout>
  );
}