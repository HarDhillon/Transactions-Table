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

export const TransactionTable = () => {
    const [fetchedData, setFetchedData] = useState<TransactionResponse | null>(null)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Hard code our page, this could be set in state
                const data = await getTransactions(1) 
                setFetchedData(data)
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        }

        fetchTransactions()
    }, []) 

    if (!fetchedData) {
        return <div>Loading...</div>
    }

    const renderedData = fetchedData.transactions.map((transaction) => {
        return <TableRow key={transaction.id}>
            <TableCell className="border">{ transaction.id }</TableCell>
            <TableCell className="border">{ transaction.date }</TableCell>
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