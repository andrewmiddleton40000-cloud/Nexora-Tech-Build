export type ImageInventoryItem = {
  filename: string;
  pageSection: string;
  purpose: string;
  recommendedDimensions: string;
  format: 'WEBP';
};

export const imageInventory: ImageInventoryItem[] = [
  {
    filename: 'hero-business.webp',
    pageSection: 'Home / Hero',
    purpose: 'Human-centered hero composition that connects business ambition to digital work.',
    recommendedDimensions: '1600 × 1067 px, landscape',
    format: 'WEBP',
  },
  {
    filename: 'web-development.webp',
    pageSection: 'Home / Services / Web solutions',
    purpose: 'Expanded service panel image for websites, landing pages, and web applications.',
    recommendedDimensions: '1200 × 800 px, landscape',
    format: 'WEBP',
  },
  {
    filename: 'mobile-app.webp',
    pageSection: 'Home / Services / Mobile solutions',
    purpose: 'Expanded service panel image for useful mobile experiences.',
    recommendedDimensions: '1200 × 800 px, landscape',
    format: 'WEBP',
  },
  {
    filename: 'ecommerce.webp',
    pageSection: 'Home / Services / Web solutions',
    purpose: 'Secondary service panel image for digital commerce and customer journeys.',
    recommendedDimensions: '900 × 1200 px, portrait',
    format: 'WEBP',
  },
  {
    filename: 'ai-automation.webp',
    pageSection: 'Home / Services / AI & automation',
    purpose: 'Expanded service panel image for practical intelligence and automation.',
    recommendedDimensions: '1200 × 800 px, landscape',
    format: 'WEBP',
  },
  {
    filename: 'business-systems.webp',
    pageSection: 'Home / Services / Business technology; Portfolio concepts',
    purpose: 'People-and-process visual for connected systems and operational clarity.',
    recommendedDimensions: '900 × 1200 px, portrait',
    format: 'WEBP',
  },
  {
    filename: 'about-team.webp',
    pageSection: 'Home / About',
    purpose: 'Visual-only collaboration image; it signals proximity to people, not team size.',
    recommendedDimensions: '1600 × 1067 px, landscape',
    format: 'WEBP',
  },
  {
    filename: 'business-growth.webp',
    pageSection: 'Home / Solutions; Portfolio concepts',
    purpose: 'Human-centered visual for customer growth and digital momentum.',
    recommendedDimensions: '900 × 1200 px, portrait',
    format: 'WEBP',
  },
  {
    filename: 'automation.webp',
    pageSection: 'Home / Solutions; Portfolio concepts',
    purpose: 'Human-centered visual for teams using automation to remove friction.',
    recommendedDimensions: '900 × 1200 px, portrait',
    format: 'WEBP',
  },
];
