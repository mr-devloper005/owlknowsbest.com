import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white px-4 py-12 text-[var(--editable-page-text,#20252a)] sm:px-6 lg:px-0">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="bg-white">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight sm:text-6xl">About {globalContent.site.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-5 border-t border-[var(--editable-border)] pt-8 text-base leading-8 text-slate-700">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-10 bg-[#eeeeee] p-6">
              <h2 className="border-l-[3px] border-[var(--slot4-accent)] pl-4 text-2xl font-semibold">What readers can expect</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">Clear headlines, compact cards, strong imagery, useful excerpts, and article detail pages that keep attention on the story instead of page furniture.</p>
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-6">
                <h2 className="text-xl font-semibold">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
