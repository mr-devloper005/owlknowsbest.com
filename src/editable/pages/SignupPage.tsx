import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-0">
          <div className="border border-[var(--editable-border)] bg-[#f7f7f7] p-6 shadow-sm sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-slate-700">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black leading-tight sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-700">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-3 text-sm leading-7 text-slate-700 sm:grid-cols-2">
              <p className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-4">Set up a contributor profile for article drafts, pitch notes, and publication-ready submissions.</p>
              <p className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-4">After signup, the navbar changes from Login and Sign up to your name and Logout.</p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
