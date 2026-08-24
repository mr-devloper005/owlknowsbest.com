import Link from 'next/link'

import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const decodeHtmlEntities = (value: string) => value
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')

const stripHtmlToText = (value: string) => decodeHtmlEntities(value)
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const looksLikeScrapedNavigation = (value: string) => {
  const normalized = stripHtmlToText(value).toLowerCase()
  if (!normalized) return false
  const badPhrases = [
    'account log in', 'register contact info', 'shopping cart', 'your cart is empty',
    'go to shop', 'subtotal', 'view cart', 'checkout', 'follow us', 'all categories',
    'search explore', 'trending now', 'popular listings', 'latest jobs', 'job categories',
    'join our whatsapp', 'telegram channel', 'featured administrator', 'description manage',
    'home improvement automotive travel blog shopping service lifestyle', 'casino cbd social media game'
  ]
  if (badPhrases.some((phrase) => normalized.includes(phrase))) return true
  return normalized.length > 220
}

const isCleanAddress = (value: string) => {
  const text = stripHtmlToText(value)
  if (!text || looksLikeScrapedNavigation(text)) return false
  if (text.length > 180) return false
  if (/https?:\/\//i.test(text) || /@/.test(text)) return false
  const hasAddressCue = /\b(road|rd\.?|street|st\.?|avenue|ave\.?|sector|floor|suite|sco|chandigarh|kuwait|city|building|block|lane|near|india|usa|uk|uae|pin|zip|\d{4,})\b/i.test(text)
  return hasAddressCue
}

const cleanAddressField = (post: SitePost, keys: string[]) => {
  const value = getField(post, keys)
  return isCleanAddress(value) ? stripHtmlToText(value) : ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  const decoded = /&lt;[a-z][\s\S]*?&gt;/i.test(value) ? decodeHtmlEntities(value) : value
  if (/<[a-z][\s\S]*>/i.test(decoded)) return sanitizeHtml(linkifyMarkdown(decoded))
  return decoded
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => {
  const raw = post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
  return stripHtmlToText(raw)
}
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = cleanAddressField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <EditableSiteShell>
      <main className="bg-[#0a0a0a] text-[#e8e6e3]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition hover:text-white">
      <ArrowLeft className="h-3.5 w-3.5" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section>
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-0 lg:py-14">
      <article className="min-w-0">
        <BackLink task="article" />
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{categoryOf(post, 'Article')}</span>
        </div>
        <h1 className="mt-4 max-w-3xl font-mono text-3xl font-bold uppercase leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">{post.title}</h1>
        <div className="mt-6 h-px bg-white/[0.06]" />
        {images[0] ? <img src={images[0]} alt="" className="mt-8 max-h-[620px] w-full object-cover opacity-80" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" post={post} related={related} />
      </div>
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = cleanAddressField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-0 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="border border-white/[0.06] bg-[#111] p-6 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden bg-[#1a1a1a]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 text-white/20" />}
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">Business listing</p>
              <h1 className="mt-3 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-5xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/45">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = cleanAddressField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-0 lg:py-16">
      <aside className="border border-white/[0.06] bg-[#e84c30] p-7 text-white lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">Classified notice</p>
        <h1 className="mt-4 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-4xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="bg-white px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a0a0a]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="border border-white/25 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">Email</a> : null}
        </div>
      </aside>
      <article className="border border-white/[0.06] bg-[#111] p-6 sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const website = getField(post, ['website', 'url', 'targetUrl', 'sourceUrl', 'link'])
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-0 lg:py-14">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(360px,0.78fr)_1.22fr]">
        <aside className="border border-white/[0.06] bg-[#111] p-7 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 bg-[#e84c30] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white"><Camera className="h-3.5 w-3.5" /> Image story</div>
          <h1 className="mt-6 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-4xl">{post.title}</h1>
          {summaryText(post) ? <p className="mt-5 text-base leading-8 text-white/45">{summaryText(post)}</p> : null}
          <BodyContent post={post} compact tone="light" />
          {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-[#e84c30] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white">Visit target page <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        </aside>
        <div className="border border-white/[0.06] bg-[#0f0f0f] p-3 sm:p-4">
          <div className="columns-1 gap-4 space-y-4 md:columns-2">
            {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
              <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden border border-white/[0.06]">
                <img src={image} alt="" className="w-full object-cover" />
                {index === 0 ? <figcaption className="p-4 font-mono text-[11px] font-bold text-white/30">Featured visual from this image post.</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-0 lg:py-16">
      <article className="border border-white/[0.06] bg-[#111] p-7 sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-16 w-16 items-center justify-center bg-[#e84c30]"><Bookmark className="h-8 w-8 text-white" /></div>
        <h1 className="mt-7 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-5xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-white/45">{summaryText(post)}</p>
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 bg-white px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a0a0a]">Open saved resource <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-0 lg:py-16">
      <article className="border border-white/[0.06] bg-[#111] p-6 sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center bg-[#e84c30]"><FileText className="h-12 w-12 text-white" /></div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">PDF resource</p>
            <h1 className="mt-3 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-5xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden border border-white/[0.06]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#1a1a1a] p-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#e84c30] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">Download <Download className="h-3.5 w-3.5" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-0 lg:py-16">
      <aside className="border border-white/[0.06] bg-[#111] p-8 text-center lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center overflow-hidden bg-[#1a1a1a]">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 text-white/20" />}
        </div>
        <h1 className="mt-6 font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em]">{post.title}</h1>
        {role ? <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#e84c30]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="border border-white/[0.06] bg-[#111] p-7 sm:p-10">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

function BodyContent({ post, compact = false, tone = 'default' }: { post: SitePost; compact?: boolean; tone?: 'default' | 'light' }) {
  const toneClass = tone === 'light'
    ? 'text-white/50 [&_a]:font-bold [&_a]:text-[#e84c30] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white'
    : 'text-white/50 [&_a]:font-bold [&_a]:text-[#e84c30] [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-bold [&_strong]:text-white/80'
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} ${toneClass}`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="border border-white/[0.06] bg-[#1a1a1a] p-4">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/30"><Icon className="h-3.5 w-3.5" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 text-white/55">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#e84c30]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] object-cover ring-1 ring-white/[0.06]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden border border-white/[0.06] bg-[#111]">
      <div className="flex items-center gap-2 p-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"><MapPin className="h-3.5 w-3.5" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 border border-white/[0.06] bg-[#1a1a1a] p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#e84c30] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white">Website <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"><Phone className="h-3.5 w-3.5" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"><Mail className="h-3.5 w-3.5" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">{label}</span><span className="font-bold">{value}</span></div>
}

function RelatedPanel({ task, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact && task !== 'article' ? (
        <div className="border border-white/[0.06] bg-[#111] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">Post type</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-white/50">
            <p className="inline-flex items-center gap-2"><Tag className="h-3.5 w-3.5" /> {taskConfig?.label || task}</p>
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div>
          <div className="flex items-center justify-between gap-3 border-l-2 border-[#e84c30] bg-[#111] px-4 py-3">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.1em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 hover:text-[#e84c30]">View all</Link>
          </div>
          <div className="mt-3 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 border-b border-white/[0.04] pb-4 transition hover:text-[#e84c30]">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-24 shrink-0 object-cover opacity-60" /> : <div className="flex h-20 w-24 shrink-0 items-center justify-center bg-[#1a1a1a]"><FileText className="h-6 w-6 text-white/20" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 font-mono text-sm font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/30">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 border-t border-white/[0.06] pt-8">
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
        <span className="font-mono text-sm font-bold uppercase tracking-[0.14em]"><MessageCircle className="mr-2 inline h-4 w-4" />Comments</span>
      </div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-white/[0.06] bg-[#111] p-4">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.08em]">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/40">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-white/30">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
