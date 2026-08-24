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
      <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e3]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-0">
          <div className="border border-white/[0.06] bg-[#111] p-6 sm:p-8">
            <h1 className="font-mono text-3xl font-bold uppercase tracking-[0.02em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/40">Already have an account? <Link href="/login" className="font-bold text-[#e84c30] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{pagesContent.auth.signup.badge}</span>
            </div>
            <h2 className="mt-5 max-w-2xl font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl lg:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/45">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-3 text-sm leading-7 text-white/40 sm:grid-cols-2">
              <p className="border-l-2 border-[#e84c30] bg-[#111] p-4">Set up a contributor profile for article drafts, pitch notes, and publication-ready submissions.</p>
              <p className="border-l-2 border-[#e84c30] bg-[#111] p-4">After signup, the navbar changes from Login and Sign up to your name and Logout.</p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
