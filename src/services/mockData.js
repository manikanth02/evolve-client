/**
 * Verified fallback data for frontend offline resilience.
 * Ensures the website functions smoothly even if the backend server is not running.
 */
import { cloudinaryImages, getImageUrl, optimizeCloudinaryUrl } from './cloudinaryImages';

export const mockProgrammes = [
  {
    title: 'Leadership Development & Inner Mastery',
    slug: 'leadership-development-inner-mastery',
    shortDescription: 'Discover the timeless principles of selfless leadership, emotional composure, and decisive action under pressure.',
    description: 'Real leadership does not begin with commanding others; it begins with mastering oneself. Drawing inspiration from ancient wisdom, this programme equips young individuals to navigate complex modern challenges with integrity, clarity, and courage.',
    category: 'Leadership Development',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Interactive Workshop', '6-Week Cohort', 'Offline Intensive'],
    isPublished: true
  },
  {
    title: 'Life Skills & Mind Management',
    slug: 'life-skills-mind-management',
    shortDescription: 'Master your thoughts, overcome digital distraction, and build unwavering focus through proven contemplative practices.',
    description: 'Practical training in mental hygiene, attention regulation, and intentional living amidst an overwhelming digital world.',
    category: 'Life Skills',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Weekend Intensive', 'Online Cohort'],
    isPublished: true
  },
  {
    title: 'Purposeful Living & Personal Philosophy',
    slug: 'purposeful-living-personal-philosophy',
    shortDescription: 'Unpack the concept of Swadharma (one’s true duty and calling) to align your personal talents with meaningful societal contribution.',
    description: 'Moving beyond superficial milestones, this programme invites participants into deep self-inquiry to clarify core values, discover inner strengths, and define a compass for life.',
    category: 'Purposeful Living',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Interactive Workshop', 'Offline Retreat'],
    isPublished: true
  },
  {
    title: 'Healthy Habits, Energy & Well-being',
    slug: 'healthy-habits-energy-wellbeing',
    shortDescription: 'Harmonize your sleep, nutrition, physical vitality, and mental energy using time-tested lifestyle principles.',
    description: 'True success belongs to those who are balanced in eating, recreation, work, and sleep. This holistic programme empowers youth to build sustainable daily rhythms.',
    category: 'Healthy Habits and Well-being',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Interactive Cohort', 'Practical Workshop'],
    isPublished: true
  },
  {
    title: 'Practical Bhagavad Gita Wisdom for Modern Life',
    slug: 'practical-bhagavad-gita-wisdom',
    shortDescription: 'Explore the profound psychology of the Gita as an actionable manual for overcoming inner dilemmas and living courageously.',
    description: 'Set on a battlefield of moral uncertainty, the conversation between Krishna and Arjuna is the ultimate dialogue on human psychology, duty, and purpose. We deconstruct key verses into direct, real-world tools.',
    category: 'Practical Bhagavad Gita Wisdom',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Weekly Wisdom Circle', 'Interactive Seminar'],
    isPublished: true
  },
  {
    title: 'Youth Mentorship & Peer Growth',
    slug: 'youth-mentorship-peer-growth',
    shortDescription: 'Connect with compassionate mentors and like-minded peers dedicated to mutual upliftment, learning, and accountability.',
    description: 'Growth rarely happens in isolation. Evolve Club pairs aspiring youth with mentors who listen, guide, and hold space for meaningful personal evolution.',
    category: 'Youth Mentorship',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['1-on-1 Mentorship', 'Peer Growth Circles'],
    isPublished: true
  },
  {
    title: 'Community Service & Social Impact',
    slug: 'community-service-social-impact',
    shortDescription: 'Translate wisdom into tangible action through grassroots initiatives, environmental care, and service to vulnerable communities.',
    description: 'True wisdom blossoms through Seva (selfless service). Participants engage in hands-on community projects that awaken empathy, humility, and civic responsibility.',
    category: 'Community Service',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Field Projects', 'Weekend Seva Drives'],
    isPublished: true
  },
  {
    title: 'Addiction Awareness & Responsible Choices',
    slug: 'addiction-awareness-responsible-choices',
    shortDescription: 'Reclaim agency from compulsive behaviours, screen addiction, substance pressure, and peer conformity.',
    description: 'In a world designed to capture dopamine and hook attention, staying anchored in conscious decision-making is a superpower. Compassionate, evidence-informed guidance to break free.',
    category: 'Addiction Awareness and Responsible Choices',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
    deliveryFormats: ['Awareness Workshops', 'Confidential Support Circles'],
    isPublished: true
  }
];

import { articlesData } from '../data/Article/index.js';

export const mockArticles = articlesData;

export const mockActivities = cloudinaryImages.map(img => ({
  id: img.id,
  title: img.title,
  description: img.caption || img.alt,
  date: img.date,
  location: img.location,
  images: [optimizeCloudinaryUrl(getImageUrl(img), { width: 800 })],
  category: img.category,
  alt: img.alt,
  section: img.section,
  isPublished: true
}));
