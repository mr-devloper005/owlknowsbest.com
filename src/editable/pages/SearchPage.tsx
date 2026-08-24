import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

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
  .replace(/\s+/g, ' ')
  .trim()

const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => {
  const raw = post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
  return stripHtml(raw)
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12] hover:shadow-[0_18px_55px_rgba(0,0,0,0.5)] ${strong ? 'md:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-black ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 bg-black/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? <span className="bg-[#e84c30] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white">{taskLabel}</span> : null}
        <h2 className="mt-4 line-clamp-3 font-mono text-xl font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/40">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 transition group-hover:text-[#e84c30]">Open result <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e3]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-0 lg:py-14">
          <div className="grid gap-8 border border-white/[0.06] bg-[#111] p-6 md:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{pagesContent.search.hero.badge}</span>
              </div>
              <h1 className="mt-5 font-mono text-3xl font-bold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/40">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-end border border-white/[0.06] bg-[#1a1a1a] p-4 sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 border border-white/[0.08] bg-[#111] px-4 py-3">
                <Search className="h-5 w-5 text-white/25" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/20" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 border border-white/[0.08] bg-[#111] px-4 py-3">
                  <Filter className="h-4 w-4 text-white/25" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/20" />
                </label>
                <select name="task" defaultValue={task} className="border border-white/[0.08] bg-[#111] px-4 py-3 font-mono text-sm text-white outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center bg-[#e84c30] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">{results.length} results</p>
              <h2 className="mt-2 font-mono text-2xl font-bold uppercase tracking-[0.02em]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#111] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition hover:text-white">Browse latest <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 border border-dashed border-white/[0.08] bg-[#111] p-10 text-center">
              <p className="font-mono text-xl font-bold uppercase tracking-[0.02em]">No matching posts found.</p>
              <p className="mt-3 text-sm text-white/35">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
