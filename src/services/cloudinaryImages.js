/**
 * Central Cloudinary & Local Media Registry for Evolve Club.
 *
 * Manages real photos, titles, categories, alt text, and display order.
 * Supports direct Cloudinary delivery URLs or high-resolution local assets.
 * Strictly client-safe: NEVER exposes Cloudinary API secret/credentials.
 */

export const cloudinaryImages = [
  // 1. Workshops & Leadership
  {
    id: 'workshop-leadership',
    title: 'Leadership Development & Inner Mastery Workshop',
    category: 'Workshops & Leadership',
    section: 'workshops',
    url: 'https://res.cloudinary.com/dgec22ut3/image/upload/v1791979769/4I3A2950_gi31oj.jpg',
    alt: 'Evolve Club youth participating in leadership development and inner mastery workshop',
    caption: 'Mohali Learning Centre · Cultivating purposeful action and selfless leadership',
    location: 'Mohali Learning Centre',
    date: '2026-03-12',
    order: 1
  },
  {
    id: 'workshop-mind-management',
    title: 'Mind Management & Cognitive Focus Session',
    category: 'Workshops & Leadership',
    section: 'workshops',
    url: '/images/activities/evolve-mind-management.jpg',
    alt: 'Participants learning breathwork, cognitive focus, and emotional regulation',
    caption: 'Chandigarh Community Space · Overcoming distraction and building daily mental poise',
    location: 'Chandigarh Community Space',
    date: '2026-02-20',
    order: 2
  },
  {
    id: 'workshop-team-discussion',
    title: 'Values-Based Leadership & Peer Dialogue',
    category: 'Workshops & Leadership',
    section: 'workshops',
    url: 'https://res.cloudinary.com/dgec22ut3/image/upload/v1791979786/IMG_6597_1_luq91w.jpg',
    alt: 'Young leaders discussing ethical decision making and teamwork',
    caption: 'Interactive workshop on ethical responsibility and collaboration',
    location: 'Chandigarh',
    date: '2026-02-15',
    order: 3
  },

  // 2. Community Service
  {
    id: 'community-tree-drive',
    title: 'Community Cleanliness & Tree Nurturance Drive',
    category: 'Community Service',
    section: 'community',
    url: '/images/activities/evolve-community-seva.jpg',
    alt: 'Evolve Club youth volunteers engaged in environmental care and tree planting',
    caption: 'Chandigarh Green Corridor · Hands-on environmental Seva and civic responsibility',
    location: 'Chandigarh Green Corridor',
    date: '2026-03-28',
    order: 4
  },
  {
    id: 'community-outdoor-seva',
    title: 'Grassroots Community Outreach Initiative',
    category: 'Community Service',
    section: 'community',
    url: '/images/activities/evolve-outdoor-drive.jpg',
    alt: 'Volunteers participating in outdoor civic seva and public area clean-up',
    caption: 'Tricity Civic Drive · Translating empathy into practical community upliftment',
    location: 'Mohali & Chandigarh',
    date: '2026-03-05',
    order: 5
  },

  // 3. Our Activities (General / Wisdom Circles)
  {
    id: 'activity-youth-circle',
    title: 'Youth Reflection & Open Dialogue Circle',
    category: 'Our Activities',
    section: 'activities',
    url: '/images/activities/evolve-youth-circle.jpg',
    alt: 'Youth gathered in an open reflection circle exploring personal growth and focus',
    caption: 'Chandigarh Learning Space · Open peer discussions on habits and purpose',
    location: 'Chandigarh',
    date: '2026-02-28',
    order: 6
  },
  {
    id: 'activity-wisdom-dialogue',
    title: 'Practical Bhagavad Gita Wisdom Dialogue',
    category: 'Our Activities',
    section: 'activities',
    url: '/images/activities/evolve-wisdom-dialogue.jpg',
    alt: 'Students exploring modern psychological applications of the Bhagavad Gita',
    caption: 'Weekly Wisdom Circle · Actionable philosophy for everyday life dilemmas',
    location: 'Mohali',
    date: '2026-03-18',
    order: 7
  },
  {
    id: 'activity-campus-session',
    title: 'Campus Habit & Focus Seminar',
    category: 'Our Activities',
    section: 'activities',
    url: '/images/activities/evolve-campus-session.jpg',
    alt: 'College students attending interactive habit and attention workshop',
    caption: 'University Campus Workshop · Practical tools for digital wellness and clarity',
    location: 'Chandigarh University Campus',
    date: '2026-03-22',
    order: 8
  },
  {
    id: 'activity-group-mentorship',
    title: 'Youth Mentorship & Accountability Circle',
    category: 'Our Activities',
    section: 'activities',
    url: '/images/activities/evolve-group-mentorship.jpg',
    alt: 'Mentors and students collaborating on personal development goals',
    caption: 'Peer Mentorship Circle · Mutual upliftment and disciplined growth',
    location: 'Chandigarh',
    date: '2026-04-02',
    order: 9
  },

  // 4. Our Journey
  {
    id: 'journey-phase-foundations',
    title: 'The Inception & First Community Dialogues',
    category: 'Our Journey',
    section: 'journey',
    url: '/images/activities/evolve-journey-milestone.jpg',
    alt: 'Early gathering of youth and mentors shaping the vision of Evolve Club',
    caption: 'The beginning of our journey in Chandigarh · Building the foundations',
    location: 'Chandigarh',
    date: '2025-10-15',
    order: 10
  },
  {
    id: 'journey-reflection-circle',
    title: 'The Evolution of Peer Dialogue Circles',
    category: 'Our Journey',
    section: 'journey',
    url: '/images/activities/evolve-reflection-circle.jpg',
    alt: 'Expanding community reflection circles across Chandigarh and Mohali',
    caption: 'Growing our community circles across the Tricity region',
    location: 'Chandigarh & Mohali',
    date: '2025-12-10',
    order: 11
  }
];

/**
 * Returns the effective delivery URL for an image item.
 */
export const getImageUrl = (imageItem) => {
  if (!imageItem) return '';
  if (imageItem.url && imageItem.url.trim().length > 0) {
    return imageItem.url.trim();
  }
  return imageItem.fallbackUrl || '';
};

/**
 * Applies responsive optimization transformations to a Cloudinary URL (if it is from Cloudinary).
 * Automatically injects `f_auto,q_auto` and optional width constraints.
 */
export const optimizeCloudinaryUrl = (url, { width = 1200, quality = 'auto' } = {}) => {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('cloudinary.com')) return url;

  if (url.includes('/image/upload/') && !url.includes('/f_auto')) {
    const transformation = `f_auto,q_${quality},w_${width},c_limit`;
    return url.replace('/image/upload/', `/image/upload/${transformation}/`);
  }
  return url;
};

/**
 * Filter images by category: 'Our Activities' | 'Community Service' | 'Workshops & Leadership' | 'Our Journey'
 */
export const getImagesByCategory = (category) => {
  if (!category || category === 'All') return [...cloudinaryImages].sort((a, b) => a.order - b.order);
  return cloudinaryImages
    .filter((img) => img.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.order - b.order);
};

/**
 * Filter images by section: 'activities' | 'community' | 'workshops' | 'journey'
 */
export const getImagesBySection = (section) => {
  if (!section) return cloudinaryImages;
  return cloudinaryImages
    .filter((img) => img.section.toLowerCase() === section.toLowerCase())
    .sort((a, b) => a.order - b.order);
};
