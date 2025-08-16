import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { columns } from "@/components/dashTable/columns";
import { DataTable } from "@/components/dashTable/data-table";
import { Head, usePage } from '@inertiajs/react';
import { Input } from "@/components/ui/input"
import React, { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  interface TopNfts {
    collections: {
      name: string;
      collection: string;
      stats?: {
        floor_price?: number;
        num_owners?: number;
      };
    }[];
  }

  const { props } = usePage<{ topNfts?: TopNfts }>();
  const [ address, setAddress ] = React.useState('');

  const topNfts = props.topNfts?.collections;

  console.log(props.topNfts)

  let formattedData: { name: string; id: string; floorprice: number; owners: number }[] = [];
  
  if(topNfts) {
    formattedData = topNfts.map((item: any) => ({
      name: item.name,
      id: item.collection,
      floorprice: item.floor_price ?? 0,
      owners: item.owners ?? 0,
    }));

    console.log(formattedData)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="p-3 gap-3">

        <h1 className="pb-1 font-bold text-xl">New Drops</h1>
        <hr className="pb-2"/>
        <div className="h-60 aspect-[5/6]">
          New drops
        </div>

        <h1 className="pb-2 font-bold text-xl">Trending</h1>
        <Input className="w-64"
          placeholder={"Search collection ID"}
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
        />
        <div className="pt-2 select-none">
          <DataTable columns={columns} data={formattedData} />
        </div>

      </div>
    </AppLayout>
  );
}