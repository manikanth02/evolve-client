/**
 * Evolve Club — Reusable Wisdom Articles Registry.
 *
 * Curated reflections combining Bhagavad Gita psychology, modern leadership,
 * mind management, and purposeful living.
 */

import { immersedMindsArticle } from './immersedMinds.js';
import { rethinkingHappinessArticle } from './rethinkingHappiness.js';
import { stopCallingItLoveArticle } from './stopCallingItLove.js';

export { immersedMindsArticle } from './immersedMinds.js';
export { rethinkingHappinessArticle } from './rethinkingHappiness.js';
export { stopCallingItLoveArticle } from './stopCallingItLove.js';

export const articlesData = [
  stopCallingItLoveArticle,
  immersedMindsArticle,
  rethinkingHappinessArticle
];

export const getPublishedArticles = () => {
  return articlesData.filter((a) => a.isPublished);
};

export const getArticleBySlug = (slug) => {
  if (!slug) return null;
  return articlesData.find((a) => a.slug.toLowerCase() === slug.toLowerCase()) || null;
};

export default articlesData;
