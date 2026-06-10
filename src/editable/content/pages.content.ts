import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Latest articles, essays, and editorial reads',
      description: 'Explore fresh articles, thoughtful essays, explainers, and reader-focused editorial stories.',
      openGraphTitle: 'Latest articles, essays, and editorial reads',
      openGraphDescription: 'Discover article-led stories through a clean magazine-style reading experience.',
      keywords: ['article website', 'editorial stories', 'latest articles', 'online magazine'],
    },
    hero: {
      badge: 'Latest articles',
      title: ['A sharper place for', 'articles that deserve attention.'],
      description: 'Read timely stories, practical explainers, opinion pieces, and carefully organized editorial coverage without a stretched or noisy layout.',
      primaryCta: { label: 'Read latest stories', href: '/article' },
      secondaryCta: { label: 'Contact the desk', href: '/contact' },
      searchPlaceholder: 'Search articles, authors, topics, and categories',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and following ideas across articles.',
      paragraphs: [
        'This site brings together article-style reading, topic discovery, and structured editorial browsing so visitors can move naturally from one story to the next.',
        'Instead of burying strong writing in oversized blocks, the platform keeps headlines, images, excerpts, and related posts in a clean publication rhythm.',
        'Whether someone starts with a headline, category, search term, or related article, they can keep discovering useful writing without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, topics, authors, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles and ideas through one connected editorial experience.',
      description: 'Move between articles, related reads, search results, and contributor pages through one clearer visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to read the web.',
    description: `${slot4BrandConfig.siteName} is an article-first publication built for readers who want useful writing, strong headlines, and clean discovery.`,
    paragraphs: [
      'We shape the site around articles: strong lead stories, clear category paths, compact recommendations, and detail pages that let the writing breathe.',
      'Readers should be able to scan quickly, open confidently, and continue into related articles without feeling pushed through clutter.',
      'For contributors, the publication workflow stays simple: create a post, add useful context, and present it in a layout that respects the story.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, topics, authors, comments, and related reads stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach the editorial desk.',
    description: 'Send article pitches, correction requests, partnership notes, contributor questions, or publication support requests. Every message should have enough context for a helpful reply.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find articles, topics, and editorial references faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the article archive.',
      placeholder: 'Search by headline, topic, category, or author',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new article content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new articles.',
      description: 'Use your account to open the publishing workspace and draft article submissions for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create a clean article submission.',
      description: 'Choose the article lane, add a clear headline, write a useful summary, attach an image, and prepare body content for readers.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the newsroom.',
      description: 'Login to continue reading, creating article drafts, and managing submissions from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start writing.',
      description: 'Create an account to access the article workspace, save contributor details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
