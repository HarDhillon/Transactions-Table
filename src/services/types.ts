export interface Transaction { 
    id: number
    date: string
    amount: number
    merchant: string
    category: string
}

interface Page {
    page: number
    limit: number
    totalPages?: number
    currentPage?: number
}

export interface TransactionResponse {
    next?: Page
    previous: Page
    transactions: Transaction[]
}