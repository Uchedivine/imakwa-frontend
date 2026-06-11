/**
 * World Cup utility functions
 */

/**
 * Check if a product is completely sold out (all tiers exhausted)
 * @param {Object} product - Product object with tiers array
 * @returns {boolean} - True if all tiers have 0 available licenses
 */
export const isProductSoldOut = (product) => {
  if (!product?.tiers || product.tiers.length === 0) return false
  return product.tiers.every((tier) => tier.available_licenses === 0)
}

/**
 * Get price range across all tiers of a product
 * @param {Object} product - Product object with tiers array
 * @returns {Object} - { min, max, currency }
 */
export const getProductPriceRange = (product) => {
  if (!product?.tiers || product.tiers.length === 0) {
    return { min: 0, max: 0, currency: 'USD' }
  }

  const prices = product.tiers.map((tier) => tier.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    currency: product.tiers[0].currency || 'USD',
  }
}

/**
 * Format price range for display
 * @param {Object} product - Product object with tiers array
 * @returns {string} - Formatted price range (e.g., "$45 - $1,950")
 */
export const formatPriceRange = (product) => {
  const { min, max } = getProductPriceRange(product)
  
  if (min === max) {
    return `$${min.toLocaleString()}`
  }
  
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`
}

/**
 * Count active tiers in a product
 * @param {Object} product - Product object with tiers array
 * @returns {number} - Count of tiers with available licenses
 */
export const getActiveTierCount = (product) => {
  if (!product?.tiers) return 0
  return product.tiers.filter((tier) => tier.available_licenses > 0).length
}
