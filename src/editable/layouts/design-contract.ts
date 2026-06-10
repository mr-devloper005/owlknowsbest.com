import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-brand-name': `"${process.env.NEXT_PUBLIC_SITE_NAME || 'DJL Servicios'}"`,
  '--slot4-page-bg': '#f7f7f7',
  '--slot4-page-text': '#20252a',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5e6670',
  '--slot4-soft-muted-text': '#737b85',
  '--slot4-accent': '#f3242f',
  '--slot4-accent-fill': '#f3242f',
  '--slot4-accent-soft': '#fff0f1',
  '--slot4-dark-bg': '#30363d',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e8eaed',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f7f7',
  '--slot4-lavender': '#ffffff',
  '--slot4-gray': '#f2f3f5',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f7f7 54%, #f2f3f5 100%)',
  '--editable-container': '1120px',
  '--editable-border': 'rgba(32,37,42,0.12)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.06]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(0,0,0,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-0',
    sectionY: 'py-12 sm:py-14 lg:py-16',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.18em]',
    heroTitle: 'text-4xl font-black leading-[1.02] sm:text-5xl lg:text-[4.5rem]',
    sectionTitle: 'text-2xl font-black sm:text-3xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-sm ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm ${editablePalette.accentBg} px-6 py-3 text-sm font-black text-white transition hover:bg-[#d91d27]`,
    secondary: `inline-flex items-center justify-center rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-black ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-sm ${editablePalette.accentBg} px-6 py-3 text-sm font-black text-white transition hover:bg-[#d91d27]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
