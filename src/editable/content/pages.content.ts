import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Deep analysis, curated reads, and expert perspectives',
      description: 'Explore in-depth articles, expert analysis, curated topic discovery, and reader-first editorial content.',
      openGraphTitle: 'Deep analysis, curated reads, and expert perspectives',
      openGraphDescription: 'Discover precision-curated articles through a command-center reading experience.',
      keywords: ['knowledge platform', 'expert analysis', 'in-depth articles', 'curated reads'],
    },
    hero: {
      badge: 'Latest dispatch',
      title: ['Precision knowledge for', 'those who dig deeper.'],
      description: 'Read in-depth analysis, expert perspectives, tactical guides, and carefully organized editorial coverage built for serious readers.',
      primaryCta: { label: 'Read latest', href: '/article' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
      searchPlaceholder: 'Search articles, topics, and categories',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and following ideas across articles.',
      paragraphs: [
        'This platform brings together deep-dive articles, topic discovery, and structured editorial browsing so visitors can move naturally from one analysis to the next.',
        'Instead of burying strong writing in oversized blocks, the platform keeps headlines, images, excerpts, and related posts in a clean command-center rhythm.',
        'Whether someone starts with a headline, category, search term, or related article, they can keep discovering useful writing without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, topics, and supporting resources.',
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
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Mission',
    title: 'Built from the ground up.',
    description: `${slot4BrandConfig.siteName} is a precision-built knowledge platform for readers who demand depth, clarity, and expert-level coverage.`,
    paragraphs: [
      'We shape the platform around deep analysis: strong lead stories, clear category paths, compact recommendations, and detail pages that let the writing breathe.',
      'Readers should be able to scan quickly, open confidently, and continue into related articles without feeling pushed through clutter.',
      'For contributors, the publishing workflow stays simple: create a post, add useful context, and present it in a layout that respects the work.',
    ],
    values: [
      {
        title: 'Precision-first experience',
        description: 'We prioritize clarity, depth, and structure so readers can analyze, browse, and discover without noise.',
      },
      {
        title: 'Connected knowledge surfaces',
        description: 'Articles, topics, contributors, comments, and related reads stay connected so discovery feels natural.',
      },
      {
        title: 'Built for trust',
        description: 'We focus on clean navigation and clear page structure to help visitors find authoritative content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach our editorial desk.',
    description: 'Send article pitches, correction requests, partnership notes, contributor questions, or publication support requests. Every message should have enough context for a helpful reply.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the platform.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find articles, topics, and editorial references faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the archive.',
      placeholder: 'Search by headline, topic, category, or contributor',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new article content for the platform.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new articles.',
      description: 'Use your account to open the publishing workspace and draft article submissions for the active sections.',
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
      metadataDescription: 'Login page for this platform.',
      badge: 'Member access',
      title: 'Welcome back to the command center.',
      description: 'Login to continue reading, creating article drafts, and managing submissions from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this platform.',
      badge: 'Platform access',
      title: 'Create your account and start contributing.',
      description: 'Create an account to access the publishing workspace, save contributor details, and submit content.',
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
