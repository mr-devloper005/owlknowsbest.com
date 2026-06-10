import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-0">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-tight sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-700">{pagesContent.auth.login.description}</p>
            <div className="mt-8 grid gap-3 text-sm leading-7 text-slate-700 sm:grid-cols-2">
              <p className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-4">Continue article drafts, review saved submissions, and keep your publishing flow in one place.</p>
              <p className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-4">Your login state updates the navbar instantly with your name and logout action.</p>
            </div>
          </div>
          <div className="border border-[var(--editable-border)] bg-[#f7f7f7] p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-slate-700">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
