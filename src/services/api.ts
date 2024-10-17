import { TransactionResponse } from "./types"


export const getTransactions = async (page?: number) => {
    let url = 'https://tip-transactions.vercel.app/api/transactions'

    if (page) {
        url += `?page=${page}`;
      }
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch transactions')
    }

    const data: TransactionResponse = await response.json()
    return data
}