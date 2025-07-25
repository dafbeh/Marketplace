import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { columns } from "@/components/dashTable/columns"
import { DataTable } from "@/components/dashTable/data-table"
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const data2 = [
  {
    name: "Moon Birds",
    id: "proof-moonbirds",
    floorprice: 1.769,
    owners: 3842,
  },
  {
    name: "Lil Pudgys",
    id: "lilpudgys",
    floorprice: 1.727,
    owners: 9840,
  },
  {
    name: "Board Ape Yacht Club",
    id: "boredapeyachtclub",
    floorprice: 12.50,
    owners: 5514,
  },
  {
    name: "Doodles",
    id: "doodles-official",
    floorprice: 1.0899,
    owners: 4142,
  },
]

export default function Dashboard() {
  const [ data, setData ] = React.useState();
  const [ isLoading, setIsLoading ] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("https://api.opensea.io/api/v2/collections", {
          headers: {
            'x-api-key': import.meta.env.VITE_OPENSEA,
          },
          params: {
            chain: "ethereum",
            order_by: "market_cap",
            order_direction: "desc",
            limit: 20,
          },
        });
      
        const formattedData = response.collections.map((item: any) => ({
          name: item.name,
          id: item.collection,
          floorprice: item.stats?.floor_price ?? 0,
          owners: item.stats?.num_owners ?? 0,
        }));
      
        setIsLoading(false);
        setData(formattedData);
        console.log(response);
      } catch (error) {
        console.error("Error fetching OpenSea data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
          <div className="p-3 select-none">
            { !isLoading && <DataTable columns={columns} data={data} /> }
          </div>
      </AppLayout>
  );
}