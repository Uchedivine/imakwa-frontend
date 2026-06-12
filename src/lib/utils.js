import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Safely parse a price value to a number
 * Handles: numbers, strings, formatted strings like "$5,000" or "5,000.00"
 * @param {any} price - The price value to parse
 * @returns {number} - The parsed price as a number, or 0 if invalid
 */
export function parsePrice(price) {
  if (typeof price === 'number') return price
  if (!price) return 0
  
  // Remove currency symbols, commas, and spaces
  const cleanedPrice = String(price).replace(/[$,\s]/g, '')
  const parsed = parseFloat(cleanedPrice)
  
  return isNaN(parsed) ? 0 : parsed
}