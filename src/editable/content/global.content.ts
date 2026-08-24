import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Knowledge Command Center',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Knowledge Command Center',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
      { label: 'Create', href: '/create' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Deep analysis, curated reads, and expert perspectives',
    description: 'A precision-built knowledge platform for in-depth articles, expert analysis, curated topic discovery, and reader-first editorial content.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Search', href: '/search' },
          { label: 'Create', href: '/create' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for precision knowledge discovery and connected publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
