export type NexoraImage = {
  src: string;
  alt: string;
};

/**
 * The single source of truth for the local visual system.
 * Keep filenames stable so supplied assets can be replaced in GitHub without
 * changing component code.
 */
export const images = {
  hero: {
    business: {
      src: '/images/hero/hero-business.webp',
      alt: 'Business owner working at a laptop in a bright office',
    },
  },
  services: {
    webDevelopment: {
      src: '/images/services/web-development.webp',
      alt: 'Business owner reviewing work on a laptop',
    },
    mobileApp: {
      src: '/images/services/mobile-app.webp',
      alt: 'Professional working between a phone, computer, and printed plans',
    },
    ecommerce: {
      src: '/images/services/ecommerce.webp',
      alt: 'Customer browsing an online shop on a laptop',
    },
    aiAutomation: {
      src: '/images/services/ai-automation.webp',
      alt: 'Professional speaking through an idea while working at a computer',
    },
    businessSystems: {
      src: '/images/services/business-systems.webp',
      alt: 'Colleagues reviewing business information and a performance report',
    },
  },
  about: {
    collaboration: {
      src: '/images/about/about-team.webp',
      alt: 'Three people reviewing a digital workflow together',
    },
  },
  solutions: {
    businessGrowth: {
      src: '/images/solutions/business-growth.webp',
      alt: 'Business owner smiling beside her laptop',
    },
    automation: {
      src: '/images/solutions/automation.webp',
      alt: 'Colleagues collaborating around a laptop in a working session',
    },
  },
} as const;
