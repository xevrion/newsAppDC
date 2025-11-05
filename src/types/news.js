// Type definitions converted to JSDoc comments for better IDE support

/**
 * @typedef {'general' | 'business' | 'sports' | 'technology' | 'entertainment' | 'science'} Category
 */

/**
 * @typedef {Object} ArticleSource
 * @property {string | null} id
 * @property {string} name
 */

/**
 * @typedef {Object} Article
 * @property {ArticleSource} source
 * @property {string | null} author
 * @property {string} title
 * @property {string | null} description
 * @property {string} url
 * @property {string | null} urlToImage
 * @property {string} publishedAt
 * @property {string | null} content
 * @property {Category} [category]
 */

/**
 * @typedef {Object} NewsApiResponse
 * @property {string} status
 * @property {number} totalResults
 * @property {Article[]} articles
 */

/**
 * @typedef {Object} NewsError
 * @property {string} status
 * @property {string} code
 * @property {string} message
 */

export {};
