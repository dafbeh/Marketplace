import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Star } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
  return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <div className="p-3 select-none">
            <Table>
              <TableCaption>List of supported NFTs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Floorprice</TableHead>
                  <TableHead className="text-right">Owners</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow onClick={() => console.log("crypto")} className="cursor-pointer">
                  <TableCell className="font-medium"><Star size="15" /></TableCell>
                  <TableCell>CryptoPunks</TableCell>
                  <TableCell>15 Eth</TableCell>
                  <TableCell className="text-right">4,235</TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                  <TableCell className="font-medium"><Star size="15" /></TableCell>
                  <TableCell>CryptoPunks</TableCell>
                  <TableCell>15 Eth</TableCell>
                  <TableCell className="text-right">4,235</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
      </AppLayout>
  );
}
