export type CurrencyCode = 'USD' | 'SAR' | 'YER_OLD' | 'YER_NEW' | 'EUR'


export type Currency = {
    code: CurrencyCode,
    rate: number
}