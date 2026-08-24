import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12]">
      <div className="relative min-h-[520px] lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.1),rgba(10,10,10,0.92))]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end p-6 sm:p-8 lg:min-h-[560px]">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{label}</span>
          </div>
          <h3 className="mt-5 max-w-3xl font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-4xl lg:text-5xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/50">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 bg-[var(--slot4-accent)] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Read article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12]`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-black/60 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 font-mono text-base font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-7 text-white/35">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 border border-white/[0.06] bg-[#111] p-5 transition hover:border-white/[0.12]">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] font-mono text-[11px] font-bold text-white/30">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 font-mono text-base font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/35">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 overflow-hidden border border-white/[0.06] bg-[#111] p-4 transition hover:border-white/[0.12] sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className={`${dc.media.frame} aspect-[16/12] sm:aspect-auto sm:min-h-[190px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em] sm:text-2xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/40">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition group-hover:text-[var(--slot4-accent)]">Open article <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}
