import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-[#e8e6e3] sm:px-6 lg:px-0">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{pagesContent.about.badge}</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl lg:text-6xl">About {globalContent.site.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/45">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-5 border-t border-white/[0.06] pt-8 text-base leading-8 text-white/40">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-10 border border-white/[0.06] bg-[#111] p-6">
              <h2 className="border-l-2 border-[#e84c30] pl-4 font-mono text-xl font-bold uppercase tracking-[0.02em]">What readers can expect</h2>
              <p className="mt-4 text-sm leading-7 text-white/40">Clear headlines, compact cards, strong imagery, useful excerpts, and article detail pages that keep attention on the story instead of page furniture.</p>
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="border-l-2 border-[#e84c30] bg-[#111] p-6">
                <h2 className="font-mono text-lg font-bold uppercase tracking-[0.02em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/40">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
