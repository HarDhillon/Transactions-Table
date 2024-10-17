import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { TransactionResponse } from "@/services/types"
import { getTransactions } from "../../services/api"
import { useState, useEffect } from "react"
import { TransactionTableSkeleton } from "./TransactionTableSkeleton"

export const TransactionTable = () => {
    const [fetchedData, setFetchedData] = useState<TransactionResponse | null>(null)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Hard code our page, this could be set in state
                const data = await getTransactions(1) 
                setFetchedData(data)
            } catch (error) {
                setError('Failed to load transactions.');
            }
        }

        fetchTransactions()
    }, []) 

    if (!fetchedData) {
        return <TransactionTableSkeleton></TransactionTableSkeleton>
    }
    if (error) {
        return <div className="text-red-500">{error}</div>; 
    }
    // In case our API returns empty
    if (fetchedData && fetchedData.transactions.length === 0) {
        return <div className="text-center py-5">No transactions found.</div>;
    }

    const renderedData = fetchedData.transactions.map((transaction) => {
        const date = new Date(transaction.date);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        const normalTime = `${hours}:${minutes} - ${day}/${month}/${year} `;

        return <TableRow key={transaction.id}>
            <TableCell className="border">{ transaction.id }</TableCell>
            <TableCell className="border">{ normalTime }</TableCell>
            <TableCell className="border">£{ transaction.amount }</TableCell>
            <TableCell className="border">{ transaction.merchant }</TableCell>
            <TableCell className="border">{ transaction.category }</TableCell>
        </TableRow>
    })


    return <div className="py-5 px-12">
            <h2 className="font-bold text-3xl mb-5 text-center">Expenses</h2>
            <Table className="border">
                <TableHeader>
                    <TableRow className="bg-slate-100">
                        <TableHead className="text-black font-bold border border-slate-300">ID</TableHead>
                        <TableHead className="text-black font-bold border border-slate-300">Date</TableHead>
                        <TableHead className="text-black font-bold border border-slate-300">Amount</TableHead>
                        <TableHead className="text-black font-bold border border-slate-300"> Merchant</TableHead>
                        <TableHead className="text-black font-bold border border-slate-300">Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {renderedData}
                </TableBody>
            </Table>
        </div>
}