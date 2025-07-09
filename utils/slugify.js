/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @returns {string} - URL-friendly slug
 */
export function slugify(text) {
  if (!text) return '';

  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Replace Lithuanian characters
      .replace(/ą/g, 'a')
      .replace(/č/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ė/g, 'e')
      .replace(/į/g, 'i')
      .replace(/š/g, 's')
      .replace(/ų/g, 'u')
      .replace(/ū/g, 'u')
      .replace(/ž/g, 'z')
      // Replace special characters with spaces
      .replace(/[^\w\s-]/g, '')
      // Replace multiple spaces or hyphens with single hyphen
      .replace(/[\s_-]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}

/**
 * Create a slug from title only
 * @param {string} title - The product/article title
 * @returns {string} - Clean title-based slug
 */
export function createSlug(title) {
  return slugify(title);
}

/**
 * Find product/article by slug (title matching)
 * @param {Array} items - Array of products/articles
 * @param {string} slug - The slug to match against
 * @returns {Object|null} - The matching item or null if not found
 */
export function findBySlug(items, slug) {
  if (!items || !slug) return null;

  return (
    items.find((item) => {
      const itemSlug = slugify(item.title || item.name);
      return itemSlug === slug;
    }) || null
  );
}
