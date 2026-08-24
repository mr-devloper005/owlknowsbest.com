'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#0a0a0a', '--editable-footer-text': '#e8e6e3' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = globalContent.site.name

  return (
    <footer style={footerVars} className="border-t border-white/[0.06] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="" className="h-8 w-8 object-contain" />
              <span className="font-mono text-sm font-bold uppercase tracking-[0.16em]">{brandName}</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <div className="mt-8 h-px bg-white/[0.06]" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 border-[#e84c30] pl-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Editorial</p>
                <p className="mt-1 text-sm text-white/55">Reader submissions and article ideas.</p>
              </div>
              <div className="border-l-2 border-white/10 pl-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Contact</p>
                <p className="mt-1 text-sm text-white/55">Partnership and publishing requests.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">Sections</h2>
            <div className="mt-5 grid gap-3">
              {taskLinks.slice(0, 5).map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex items-center justify-between gap-4 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-[#e84c30]">
                  {task.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">Site</h2>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ['Search', '/search'],
                ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-[#e84c30]">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-[#e84c30]">Logout {session.name}</button> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-0">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">{year} {brandName}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
