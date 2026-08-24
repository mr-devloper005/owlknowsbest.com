import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-12 sm:pt-16 lg:pt-20`}>
        <div className="border border-white/[0.06] bg-[#111] p-7 sm:p-10 lg:p-14">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{voice.eyebrow}</span>
          </div>
          <h1 className="mt-5 max-w-5xl font-mono text-3xl font-bold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/40 sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 border border-white/[0.08] bg-[#1a1a1a] px-5 py-3 font-mono text-sm text-white outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="bg-[#e84c30] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="border border-white/[0.06] bg-[#111] p-8 text-center">
            <h2 className="font-mono text-2xl font-bold uppercase tracking-[0.02em]">No articles found</h2>
            <p className="mt-3 text-sm leading-7 text-white/35">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="border border-white/[0.08] bg-[#111] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Previous</Link> : null}
          <span className="bg-[#e84c30] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="border border-white/[0.08] bg-[#111] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-10 sm:pt-14 lg:pt-16`}>
        <div className="grid gap-6 border border-white/[0.06] bg-[#111] p-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/50"><ChevronLeft className="h-3.5 w-3.5" /> Articles</Link>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{voice.eyebrow}</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-mono text-3xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-4xl lg:text-5xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 border border-white/[0.06] bg-[#1a1a1a] p-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-[#e84c30]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">Reading note</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/40">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-[#e84c30] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white">Contact <ArrowRight className="h-3.5 w-3.5" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-0 lg:pb-24">
        <div className="border border-white/[0.06] bg-[#111] p-6 sm:p-8 lg:p-10">
          <p className="text-sm leading-8 text-white/40">{post ? getEditableExcerpt(post, 500) : `Article detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}
