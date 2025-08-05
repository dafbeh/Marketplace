import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { columns } from "@/components/dashTable/columns";
import { DataTable } from "@/components/dashTable/data-table";
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const { props } = usePage();

  const topNfts = props.topNfts?.collections;
  
  const formattedData = topNfts.map((item: any) => ({
    name: item.name,
    id: item.collection,
    floorprice: item.stats?.floor_price ?? 0,
    owners: item.stats?.num_owners ?? 0,
  }));

  console.log(formattedData)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="p-3 select-none">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </AppLayout>
  );
}