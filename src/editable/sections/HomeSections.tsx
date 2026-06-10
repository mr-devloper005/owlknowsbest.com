import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { globalContent } from '@/editable/content/global.content'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-7 flex items-center justify-between gap-4 bg-[#eeeeee]">
      <h2 className="border-l-[3px] border-[var(--slot4-accent)] px-4 py-3 text-xl font-semibold">{title}</h2>
      {href ? <Link href={href} className="mr-4 hidden text-xs font-black uppercase tracking-[0.18em] text-slate-500 hover:text-[var(--slot4-accent)] sm:inline">View all</Link> : null}
    </div>
  )
}

function HeroSlide({ post, href, large = false }: { post: SitePost; href: string; large?: boolean }) {
  return (
    <Link href={href} className={`group relative block overflow-hidden bg-slate-900 text-white ${large ? 'min-h-[420px]' : 'min-h-[260px]'}`}>
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
      <div className="absolute bottom-8 left-6 right-6 max-w-md bg-black/58 p-5 backdrop-blur-[2px]">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/85">
          <span className="border-b-2 border-white pb-2">{getEditableCategory(post)}</span>
        </p>
        <h2 className={`mt-5 line-clamp-3 font-semibold leading-tight ${large ? 'text-3xl' : 'text-2xl'}`}>{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/86">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

function ArticleCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <article className="group bg-white">
      <Link href={href} className="block">
        <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="pt-5">
          <h3 className="line-clamp-2 text-2xl font-semibold leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <div className="mt-5 inline-flex text-xs">
            <span className="bg-[var(--slot4-accent)] px-4 py-3 font-black uppercase text-white">{getEditableCategory(post)}</span>
            <span className="border border-[var(--editable-border)] px-4 py-3 font-semibold text-slate-500">Read {String(index + 1).padStart(2, '0')}</span>
          </div>
          <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-700">{getEditableExcerpt(post, 155)}</p>
        </div>
      </Link>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
        <span className="grid h-8 w-8 place-items-center bg-[var(--slot4-accent)] text-white"><ArrowRight className="h-4 w-4" /></span>
        Read more
      </Link>
    </article>
  )
}

function SidebarList({ title, posts, primaryTask, primaryRoute }: { title: string; posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  if (!posts.length) return null
  return (
    <aside>
      <SectionHeader title={title} />
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[100px_minmax(0,1fr)] gap-4">
            <div className="relative h-20 overflow-hidden bg-[var(--slot4-media-bg)]">
              <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div>
              <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
              <p className="mt-2 text-[11px] font-black uppercase text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPosts = posts.slice(0, 3)
  if (!heroPosts.length) return null
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-0">
        <div className="grid gap-3 lg:grid-cols-[1fr_2fr_1fr]">
          {heroPosts[1] ? <HeroSlide post={heroPosts[1]} href={postHref(primaryTask, heroPosts[1], primaryRoute)} /> : null}
          <HeroSlide post={heroPosts[0]} href={postHref(primaryTask, heroPosts[0], primaryRoute)} large />
          {heroPosts[2] ? <HeroSlide post={heroPosts[2]} href={postHref(primaryTask, heroPosts[2], primaryRoute)} /> : null}
        </div>
        <div className="grid border-b border-[var(--editable-border)] text-sm text-slate-500 sm:grid-cols-3">
          {heroPosts.map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="border-r border-[var(--editable-border)] px-5 py-4 last:border-r-0 hover:text-[var(--slot4-accent)]">
              <span className="block text-[11px] font-semibold uppercase text-slate-400">{getEditableCategory(post)}</span>
              <span className="line-clamp-2 text-base text-[var(--slot4-page-text)]">{post.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const latest = posts.slice(0, 4)
  const recommended = posts.slice(4, 7)
  if (!latest.length) return null
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,2fr)_330px] lg:px-0">
        <div>
          <SectionHeader title="Latest Posts" href={primaryRoute} />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {latest.map((post, index) => <ArticleCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
        <SidebarList title="Recommended" posts={recommended} primaryTask={primaryTask} primaryRoute={primaryRoute} />
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const carousel = posts.slice(7, 12)
  const mostRead = posts.slice(12, 16)
  if (!carousel.length && !mostRead.length) return null
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[minmax(0,2fr)_330px] lg:px-0">
        <div>
          <SectionHeader title="Posts Carousel" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {carousel.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group">
                <div className="aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
                  <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                <p className="mt-2 text-[11px] font-black uppercase text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
              </Link>
            ))}
          </div>
        </div>
        <aside>
          
          <div className="mt-6 grid gap-3">
            {mostRead.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="block bg-[#eeeeee] p-5 hover:bg-[#e6e6e6]">
                <span className="text-3xl font-light text-slate-400">{index === 0 ? '6 257' : index === 1 ? '5 062' : index === 2 ? '4 778' : '754'}</span>
                <h3 className="mt-2 line-clamp-2 text-base leading-snug">{post.title}</h3>
                <p className="mt-3 text-[11px] font-black uppercase text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(8)
  const feature = categoryPosts[0] || posts[0]
  const side = categoryPosts.slice(1, 5)
  if (!feature) return null
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,2fr)_330px] lg:px-0">
        <div>
          <SectionHeader title={`Latest From ${taskLabel(primaryTask)}`} href={primaryRoute} />
          <div className="grid gap-7 md:grid-cols-[1.05fr_0.95fr]">
            <ArticleCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} index={0} />
            <div className="grid content-start gap-5">
              {side.map((post) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[100px_minmax(0,1fr)] gap-4">
                  <img src={getEditablePostImage(post)} alt={post.title} className="h-24 w-full object-cover" />
                  <div>
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                    <p className="mt-3 text-[11px] font-black uppercase text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-[var(--editable-border)] bg-[#f4f4f4] p-6">
          <h2 className="text-2xl font-semibold">Search the archive</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Find article ideas, essays, reports, and useful reading from every active section.</p>
          <form action="/search" className="mt-6 grid gap-3">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="h-12 border border-[var(--editable-border)] bg-white px-4 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" />
            <button className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--slot4-accent)] px-5 text-sm font-black uppercase tracking-[0.16em] text-white">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="border-t border-[var(--editable-border)] bg-[#f7f7f7]">
      <div className={`${dc.shell.section} py-12`}>
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">For readers and contributors</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">Bring sharper articles to {globalContent.site.name}.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Send article pitches, publication questions, or partnership notes through a clean contact flow built for editorial websites.</p>
          </div>
          <Link href="/contact" className={dc.button.primary}>Contact the desk</Link>
        </div>
      </div>
    </section>
  )
}
