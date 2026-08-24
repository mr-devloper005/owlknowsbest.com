import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-brand-name': `"${process.env.NEXT_PUBLIC_SITE_NAME || 'OwlKnowsBest'}"`,
  '--slot4-page-bg': '#0a0a0a',
  '--slot4-page-text': '#e8e6e3',
  '--slot4-panel-bg': '#141414',
  '--slot4-surface-bg': '#1a1a1a',
  '--slot4-muted-text': '#8a8580',
  '--slot4-soft-muted-text': '#6b6560',
  '--slot4-accent': '#e84c30',
  '--slot4-accent-fill': '#e84c30',
  '--slot4-accent-soft': 'rgba(232,76,48,0.12)',
  '--slot4-dark-bg': '#111111',
  '--slot4-dark-text': '#f0ede8',
  '--slot4-media-bg': '#1a1a1a',
  '--slot4-cream': '#141414',
  '--slot4-warm': '#111111',
  '--slot4-lavender': '#1a1a1a',
  '--slot4-gray': '#0f0f0f',
  '--slot4-body-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)',
  '--editable-container': '1200px',
  '--editable-border': 'rgba(255,255,255,0.08)',
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
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-white/[0.08]',
  darkBorder: 'border-white/[0.06]',
  shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(0,0,0,0.6)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]',
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
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.28em] font-mono',
    heroTitle: 'text-4xl font-bold leading-[1.02] tracking-[0.04em] sm:text-5xl lg:text-[4.5rem] font-mono uppercase',
    sectionTitle: 'text-2xl font-bold tracking-[0.02em] sm:text-3xl font-mono uppercase',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center ${editablePalette.accentBg} px-6 py-3 text-sm font-bold font-mono uppercase tracking-[0.12em] text-white transition hover:brightness-110`,
    secondary: `inline-flex items-center justify-center border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-bold font-mono uppercase tracking-[0.12em] ${editablePalette.surfaceText} transition hover:bg-white/[0.06]`,
    accent: `inline-flex items-center justify-center ${editablePalette.accentBg} px-6 py-3 text-sm font-bold font-mono uppercase tracking-[0.12em] text-white transition hover:brightness-110`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.5)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
