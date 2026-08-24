'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'border border-white/[0.08] bg-[#1a1a1a] px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#e84c30]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-[#e8e6e3] sm:px-6 lg:px-0">
          <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 border border-white/[0.06] bg-[#111] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center bg-[#1a1a1a]">
              <Lock className="h-20 w-20 text-white/30" />
            </div>
            <div className="self-center">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{pagesContent.create.locked.badge}</span>
              </div>
              <h1 className="mt-5 font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/45">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 bg-[#e84c30] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 border border-white/[0.08] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-white">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e3]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-0 lg:py-14">
          <div className="grid gap-8 border border-white/[0.06] bg-[#111] p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#e84c30]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">{pagesContent.create.hero.badge}</span>
              </div>
              <h1 className="mt-5 font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/45">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`border p-4 text-left transition ${active ? 'border-[#e84c30] bg-[#1a1a1a]' : 'border-white/[0.08] bg-[#1a1a1a] hover:border-white/[0.12]'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-[#e84c30]' : 'text-white/40'}`} />
                      <span className="mt-3 block font-mono text-sm font-bold uppercase">{item.label}</span>
                      <span className="mt-1 block text-xs text-white/40">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="border border-white/[0.06] bg-[#0a0a0a] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 font-mono text-2xl font-bold uppercase tracking-[0.02em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="bg-[#1a1a1a] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400">
                  <p className="flex items-center gap-2 font-mono text-sm font-bold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm text-emerald-400/70">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#e84c30] px-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
