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

function SectionEyebrow({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      {accent ? <div className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> : null}
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/30">{label}</span>
    </div>
  )
}

function HeroFeatureCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden">
      <div className="relative min-h-[600px] lg:min-h-[700px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.2)_0%,rgba(10,10,10,0.92)_100%)]" />
        <div className="absolute inset-0 border border-white/[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
          </div>
          <h2 className="mt-5 max-w-3xl font-mono text-3xl font-bold uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl lg:text-5xl">{post.title}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">{getEditableExcerpt(post, 200)}</p>
          <span className="mt-8 inline-flex items-center gap-2 bg-[var(--slot4-accent)] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110">
            Read article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function HeroSideCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group relative block overflow-hidden border border-white/[0.06] bg-[#111]">
      <div className="relative min-h-[200px] lg:min-h-[340px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,10,0.92)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">No. {String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-3 line-clamp-3 font-mono text-lg font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPosts = posts.slice(0, 3)
  if (!heroPosts.length) return null
  return (
    <section className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pt-6 sm:px-6 lg:px-0">
        <div className="grid gap-1 lg:grid-cols-[2fr_1fr]">
          <HeroFeatureCard post={heroPosts[0]} href={postHref(primaryTask, heroPosts[0], primaryRoute)} />
          <div className="grid gap-1">
            {heroPosts.slice(1, 3).map((post, i) => (
              <HeroSideCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const latest = posts.slice(0, 6)
  if (!latest.length) return null
  return (
    <section className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-0">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow label="Latest Dispatch" accent />
            <h2 className="mt-1 font-mono text-2xl font-bold uppercase tracking-[0.03em]">Recent Articles</h2>
          </div>
          <Link href={primaryRoute} className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)] transition hover:text-white sm:inline">View all</Link>
        </div>
        <div className="mt-8 h-px bg-white/[0.06]" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block border border-white/[0.06] bg-[#111] transition hover:border-white/[0.12]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85" />
                <div className="absolute left-3 top-3 bg-black/60 px-3 py-1 backdrop-blur-sm">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-white/25">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">Read {String(index + 1).padStart(2, '0')}</span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <h3 className="mt-3 line-clamp-2 font-mono text-lg font-bold uppercase leading-tight tracking-[0.01em]">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/40">{getEditableExcerpt(post, 130)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[6]
  const side = posts.slice(7, 12)
  if (!feature && !side.length) return null
  return (
    <section className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-14 sm:px-6 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {feature ? (
            <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative block overflow-hidden border border-white/[0.06] bg-[#111]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={getEditablePostImage(feature)} alt={feature.title} className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,10,10,0.95)_100%)]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Featured</span>
                <h3 className="mt-3 max-w-xl font-mono text-2xl font-bold uppercase leading-tight tracking-[0.02em] sm:text-3xl">{feature.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">{getEditableExcerpt(feature, 160)}</p>
              </div>
            </Link>
          ) : null}

          <div className="space-y-1">
            <SectionEyebrow label="More Reads" accent />
            {side.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-4 border-b border-white/[0.04] py-4 transition hover:bg-white/[0.02]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] font-mono text-[11px] font-bold text-white/30">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-mono text-sm font-bold uppercase leading-snug tracking-[0.01em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                  <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(8)
  const topPosts = categoryPosts.slice(0, 4)
  if (!topPosts.length) return null
  return (
    <section className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-14 sm:px-6 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <SectionEyebrow label={`From ${taskLabel(primaryTask)}`} accent />
            <h2 className="mt-1 font-mono text-2xl font-bold uppercase tracking-[0.03em]">Topic Collection</h2>
            <div className="mt-6 h-px bg-white/[0.06]" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {topPosts.map((post) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block border border-white/[0.06] bg-[#111] p-5 transition hover:border-[var(--slot4-accent)]/20">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 font-mono text-base font-bold uppercase leading-snug tracking-[0.01em]">{post.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/35">{getEditableExcerpt(post, 100)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 transition group-hover:text-[var(--slot4-accent)]">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-white/[0.06] bg-[#111] p-6">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/30">Search</span>
            </div>
            <h2 className="mt-4 font-mono text-xl font-bold uppercase tracking-[0.02em]">Search the Archive</h2>
            <p className="mt-3 text-sm leading-7 text-white/40">Find articles, analysis, reports, and curated reads from every active section.</p>
            <form action="/search" className="mt-6 grid gap-3">
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="h-12 border border-white/[0.08] bg-[#1a1a1a] px-4 font-mono text-sm text-white outline-none placeholder:text-white/20" />
              <button className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--slot4-accent)] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="border-t border-white/[0.04] bg-[#0a0a0a]">
      <div className={`${dc.shell.section} py-16`}>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">For readers and contributors</span>
            </div>
            <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[0.02em] sm:text-3xl">Built from the ground up.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">No outsourcing. No shortcuts. From editorial systems to discovery algorithms, we control the entire reading experience on {globalContent.site.name}.</p>
          </div>
          <Link href="/contact" className={dc.button.primary}>Contact Us</Link>
        </div>
      </div>
    </section>
  )
}
