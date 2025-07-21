import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Payment = {
  name: string;
  id: string,
  floorprice: number;
  owners: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <Button className="-ml-3"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
  {
    accessorKey: "floorprice",
    header: ({ column }) => {
        return (
            <Button className="-ml-3"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Floor Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ getValue }) => (
          <span>{String(getValue())} <span className="text-white/60 pl-1">ETH</span></span>
        )
    },
  {
    accessorKey: "owners",
    header: ({ column }) => {
        return (
            <Button className="-ml-3"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Owners
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ getValue }) => (
          <span>{new Intl.NumberFormat().format(Number(getValue()))}</span>
        )
    },
];