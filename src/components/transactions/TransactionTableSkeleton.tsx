import { Skeleton } from "../../components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"

export const TransactionTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 20 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="border">
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
      <TableCell className="border">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell className="border">
        <Skeleton className="h-4 w-[80px]" />
      </TableCell>
      <TableCell className="border">
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell className="border">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="py-5 px-12">
      <h2 className="font-bold text-3xl mb-5 text-center">Expenses</h2>
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="text-black font-bold border border-slate-300">ID</TableHead>
            <TableHead className="text-black font-bold border border-slate-300">Date</TableHead>
            <TableHead className="text-black font-bold border border-slate-300">Amount</TableHead>
            <TableHead className="text-black font-bold border border-slate-300">Merchant</TableHead>
            <TableHead className="text-black font-bold border border-slate-300">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{skeletonRows}</TableBody>
      </Table>
    </div>
  );
};
