import { CurrencyCode } from "../models/common/currency";

// Utility function to format a number as currency based on locale and currency code
export function formatCurrency(
    amount: number,         // The amount to be formatted
    currencyCode: CurrencyCode,   // The currency code (e.g., 'USD', 'SAR', 'YER', etc.)
    locale: string = 'en-US' // Optional locale (defaults to 'en-US')
): string {
    try {
        // Create a formatter with the specified currency and locale
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',    // Ensure it's formatted as currency
            currency: currencyCode,  // The currency code (e.g., 'SAR', 'YER', 'USD')
            minimumFractionDigits: 2,  // Always show two decimal places
            maximumFractionDigits: 2   // Ensure the same number of decimal places
        });

        // Format and return the formatted price
        return formatter.format(amount);
    } catch (error) {
        console.error(`Error formatting currency: ${error}`);
        return amount.toString(); // Return the raw amount if an error occurs
    }
}

// Example Usage

// Format 1234567.89 as Saudi Riyal (SAR) in Saudi Arabia (ar-SA) locale
