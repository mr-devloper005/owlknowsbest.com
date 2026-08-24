'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = globalContent.site.name
  const navVars = {
    '--editable-nav-bg': '#0a0a0a',
    '--editable-nav-top': '#e84c30',
    '--editable-nav-text': '#e8e6e3',
    '--editable-nav-active': '#e84c30',
    '--editable-cta-bg': '#e84c30',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': '#1a1a1a',
    '--editable-border': 'rgba(255,255,255,0.08)',
  } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const mobileItems = [
    { label: 'Home', href: '/' },
    ...navItems,
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
  ]

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <div className="mx-auto flex h-14 max-w-[var(--editable-container)] items-center justify-between px-4 sm:px-6 lg:px-0">
        <Link href="/" className="flex items-center gap-3">
          <img src="/favicon.png" alt="" className="h-8 w-8 object-contain" />
          <span className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-[var(--editable-nav-text)]">{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={`px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${pathname === '/' ? 'text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/60 hover:text-[var(--editable-nav-text)]'}`}>Home</Link>
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${active ? 'text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/60 hover:text-[var(--editable-nav-text)]'}`}>
                {item.label}
              </Link>
            )
          })}
          <Link href="/about" className={`px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${pathname === '/about' ? 'text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/60 hover:text-[var(--editable-nav-text)]'}`}>About</Link>
          <Link href="/contact" className={`px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${pathname === '/contact' ? 'text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/60 hover:text-[var(--editable-nav-text)]'}`}>Contact</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 bg-[var(--editable-cta-bg)] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--editable-cta-text)] sm:inline-flex"><PlusCircle className="h-3.5 w-3.5" /> Create</Link>
              <span className="hidden max-w-28 truncate font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white/60 sm:inline">{session.name}</span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 border border-[var(--editable-border)] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-white/[0.04] sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white sm:inline-flex"><LogIn className="h-3.5 w-3.5" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 bg-[var(--editable-cta-bg)] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--editable-cta-text)] sm:inline-flex"><UserPlus className="h-3.5 w-3.5" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="border border-[var(--editable-border)] p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-40" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 font-mono text-sm text-white outline-none placeholder:text-white/30" />
          </form>
          <div className="grid gap-1">
            {mobileItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[var(--editable-border)] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="border-b border-[var(--editable-border)] px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Logout {session.name}</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
