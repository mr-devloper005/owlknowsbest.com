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
    '--editable-nav-bg': '#ffffff',
    '--editable-nav-top': '#30363d',
    '--editable-nav-text': '#20252a',
    '--editable-nav-active': '#f3242f',
    '--editable-cta-bg': '#f3242f',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': '#f3f4f6',
    '--editable-border': 'rgba(32,37,42,0.12)',
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
      <div className="hidden bg-[var(--editable-nav-top)] text-white md:block">
        <div className="mx-auto flex h-10 max-w-[var(--editable-container)] items-center justify-between text-xs font-bold">
          <Link href="/article" className="bg-[var(--editable-cta-bg)] px-4 py-3 uppercase tracking-[0.18em]">Latest</Link>
          <span className="min-w-0 flex-1 truncate px-5 opacity-90">Fresh article ideas, editorial notes, and reader-first publishing.</span>
          <form action="/search" className="flex h-full w-64 border-l border-white/10">
            <input name="q" placeholder="Search..." className="min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-white/70" />
            <button className="border-l border-white/10 px-4" aria-label="Search"><Search className="h-4 w-4" /></button>
          </form>
        </div>
      </div>

      <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center px-4 py-5 text-center sm:px-6 lg:px-0">
        <Link href="/" className="max-w-full truncate text-5xl font-black leading-none text-[var(--editable-cta-bg)] sm:text-7xl">{brandName}</Link>
        <p className="mt-2 text-sm font-semibold text-slate-500">{globalContent.nav?.tagline || globalContent.site.tagline}</p>
      </div>

      <nav className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex min-h-[50px] w-full max-w-[var(--editable-container)] items-center gap-3 px-4 sm:px-6 lg:px-0">
          <Link href="/" className={`hidden px-3 py-4 text-sm font-bold transition md:block ${pathname === '/' ? 'border-t-2 border-[var(--editable-nav-active)] text-[var(--editable-nav-active)]' : 'hover:text-[var(--editable-nav-active)]'}`}>Home</Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.slice(0, 5).map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link key={item.href} href={item.href} className={`px-3 py-4 text-sm font-bold transition ${active ? 'border-t-2 border-[var(--editable-nav-active)] text-[var(--editable-nav-active)]' : 'hover:text-[var(--editable-nav-active)]'}`}>
                  {item.label}
                </Link>
              )
            })}
            <Link href="/about" className={`px-3 py-4 text-sm font-bold transition ${pathname === '/about' ? 'border-t-2 border-[var(--editable-nav-active)] text-[var(--editable-nav-active)]' : 'hover:text-[var(--editable-nav-active)]'}`}>About</Link>
            <Link href="/contact" className={`px-3 py-4 text-sm font-bold transition ${pathname === '/contact' ? 'border-t-2 border-[var(--editable-nav-active)] text-[var(--editable-nav-active)]' : 'hover:text-[var(--editable-nav-active)]'}`}>Contact</Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {session ? (
              <>
                <Link href="/create" className="hidden items-center gap-2 rounded-sm bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><PlusCircle className="h-4 w-4" /> Create</Link>
                <span className="hidden max-w-32 truncate px-2 text-sm font-black sm:inline">{session.name}</span>
                <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-sm border border-[var(--editable-border)] px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden items-center gap-2 rounded-sm px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
                <Link href="/signup" className="hidden items-center gap-2 rounded-sm bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
              </>
            )}
            <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-sm border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-sm border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {mobileItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-sm border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-sm border border-[var(--editable-border)] bg-white px-4 py-3 text-left text-sm font-black">Logout {session.name}</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
