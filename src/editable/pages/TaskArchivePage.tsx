import Link from 'next/link'

import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value
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
const getSummary = (post: SitePost) => {
  const raw = post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
  return stripHtml(raw)
}
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight company identity, location, contacts, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-[#0a0a0a] text-[#e8e6e3]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-0 lg:py-14">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]"><Icon className="mr-2 inline h-3.5 w-3.5" />{label}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/45">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-6 border-l-2 border-[#e84c30] bg-white/[0.03] p-4 font-mono text-sm leading-7 text-white/50">{deck.promise}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="bg-[#e84c30] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Browse all</Link>
              <Link href="/search" className="border border-white/[0.08] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">Search posts</Link>
            </div>
          </div>

          <form action={basePath} className="self-end border border-white/[0.08] bg-[#111] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30"><Filter className="h-3.5 w-3.5" /> Filter</div>
            <select name="category" defaultValue={category} className="mt-4 h-12 w-full border border-white/[0.08] bg-[#1a1a1a] px-4 font-mono text-sm text-white outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full bg-[#e84c30] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Apply</button>
            <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/25">Showing: {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-14 sm:px-6 lg:px-0">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="border border-dashed border-white/[0.08] bg-[#111] p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-white/25" />
              <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[0.02em]">No posts found</h2>
              <p className="mt-2 text-sm text-white/35">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-white/[0.08] bg-[#111] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Previous</Link> : null}
            <span className="bg-[#e84c30] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-white/[0.08] bg-[#111] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12] hover:shadow-[0_18px_55px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
        <span className="absolute left-3 top-3 bg-black/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">{category}</span>
      </div>
      <div className="p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#e84c30]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 font-mono text-lg font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/35">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 border border-white/[0.06] bg-[#111] p-5 transition hover:border-white/[0.12] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden bg-[#1a1a1a]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-white/20" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#e84c30] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-white/[0.08] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/50"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/35">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[#e84c30] p-5 text-white">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Classified</span>
          <h2 className="mt-10 font-mono text-2xl font-bold uppercase tracking-[0.02em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/70">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 object-cover opacity-60" /> : null}
        </div>
        <div className="p-6">
          <h2 className="font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#e84c30]">View listing <ArrowRight className="h-3.5 w-3.5" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 bg-white/[0.05] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/50"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 font-mono text-lg font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block border border-white/[0.06] bg-[#111] p-6 transition hover:border-[#e84c30]/30 hover:bg-[#e84c30] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-white/[0.08] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:border-white/20 group-hover:text-white/70">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5 text-white/20 group-hover:text-white/60" />
      </div>
      <h2 className="mt-8 font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35 group-hover:text-white/70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/25 group-hover:text-white/50">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group border border-white/[0.06] bg-[#111] p-6 transition hover:border-white/[0.12]">
      <div className="flex items-start justify-between gap-4">
        <div className="bg-[#e84c30] p-4"><FileText className="h-7 w-7 text-white" /></div>
        <span className="border border-white/[0.08] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">{category}</span>
      </div>
      <h2 className="mt-8 font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#e84c30]">Open document <Download className="h-3.5 w-3.5" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group border border-white/[0.06] bg-[#111] p-6 text-center transition hover:border-white/[0.12]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden bg-[#1a1a1a]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-white/20" />}
      </div>
      <h2 className="mt-5 font-mono text-lg font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
      {role ? <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#e84c30]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/35">{getSummary(post)}</p>
    </Link>
  )
}
