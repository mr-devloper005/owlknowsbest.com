'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#30363d', '--editable-footer-text': '#ffffff' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = globalContent.site.name

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr_1fr] lg:px-0">
        <div>
          <h2 className="border-l-2 border-slate-500 bg-white/7 px-4 py-3 text-lg font-black">About {brandName}</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/75">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <div className="mt-6 grid gap-1 text-sm leading-6 text-white/75 sm:grid-cols-2">
            <p><span className="font-black text-white">Editorial desk</span><br />Reader submissions, article notes, and topic ideas.</p>
            <p><span className="font-black text-white">Contact</span><br />Use the contact page for publishing and partnership requests.</p>
          </div>
        </div>

        <div>
          <h2 className="border-l-2 border-slate-500 bg-white/7 px-4 py-3 text-lg font-black">Latest Sections</h2>
          <div className="mt-5 grid gap-3">
            {taskLinks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center justify-between gap-4 text-sm font-bold text-white/78 hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="border-l-2 border-slate-500 bg-white/7 px-4 py-3 text-lg font-black">Site</h2>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/78 hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/78 hover:text-white">Logout {session.name}</button> : null}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-5 text-xs font-bold text-white/55 sm:px-6 lg:px-0">
        <span>Copyright {year} {brandName}. All rights reserved.</span>
        <Link href="/" className="hover:text-white">Top</Link>
      </div>
    </footer>
  )
}
