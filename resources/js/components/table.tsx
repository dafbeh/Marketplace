import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CreateTable({averagePrice, sales, volume}: any) {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Average Price <span className="text-xs text-gray-600">ETH</span></TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{averagePrice}</TableCell>
              <TableCell>{sales}</TableCell>
              <TableCell>{volume}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    )
}
