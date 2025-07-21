import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { columns } from "@/components/dashTable/columns"
import { DataTable } from "@/components/dashTable/data-table"
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const data = [
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
]

export default function Dashboard() {
  return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
          <div className="p-3 select-none">
            <DataTable columns={columns} data={data} />
          </div>
      </AppLayout>
  );
}
