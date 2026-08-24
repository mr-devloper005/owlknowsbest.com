import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'calm magazine authority',
    fontDirection: 'serif headlines with quiet sans body',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'sharp editorial cards with thin borders',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with spacious tracking',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'large dark panels, accent hairlines, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'sharp edges, thick borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded serif or humanist sans with soft captions',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'sharp cards, natural spacing, calm texture',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'stickers, tabs, framed modules, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#0a0a0a',
      foreground: '#e8e6e3',
      muted: '#6b6560',
      primary: '#e84c30',
      accent: '#e84c30',
      surface: '#111111',
    },
    shape: 'dark cards, large media, glass overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'editorial-paper'
        : slot4BrandConfig.productKind === 'directory'
          ? 'tech-directory'
          : 'organic-journal',
  radius: {
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.28em] font-mono',
    heroTitle: 'text-5xl font-bold tracking-[0.04em] sm:text-6xl lg:text-7xl font-mono uppercase',
    sectionTitle: 'text-3xl font-bold tracking-[0.02em] sm:text-4xl font-mono uppercase',
    body: 'text-base leading-8',
    caption: 'text-[10px] font-bold uppercase tracking-[0.18em] font-mono',
  },
  surfaces: {
    glass: 'border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl',
    paper: 'border border-white/[0.06] bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.4)]',
    quiet: 'border border-white/[0.06] bg-white/[0.02]',
    dark: 'border border-white/[0.06] bg-[#0a0a0a] shadow-[0_24px_70px_rgba(0,0,0,0.5)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
