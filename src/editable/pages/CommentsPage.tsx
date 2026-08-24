'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Just now'
  }
}

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted local comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => {
      return [item.name, item.email, item.comment, item.articleTitle, item.articleSlug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e3]">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="border border-white/[0.06] bg-[#111] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-[#e84c30]" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#e84c30]">Local comments</span>
                </div>
                <h1 className="mt-4 font-mono text-4xl font-bold uppercase tracking-[0.02em] sm:text-5xl">Comments</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  Review comments saved in this browser from article pages.
                </p>
              </div>
              <button type="button" className="border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-white" onClick={refreshComments}>Refresh comments</button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search comments..."
                  className="h-11 w-full border border-white/[0.08] bg-[#1a1a1a] pl-9 pr-3 font-mono text-sm text-white outline-none placeholder:text-white/20 focus:border-[#e84c30]"
                />
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                {filtered.length} comment{filtered.length === 1 ? '' : 's'} found
              </p>
            </div>
          </div>

          {visibleComments.length ? (
            <div className="mt-6 grid gap-4">
              {visibleComments.map((item) => (
                <article key={`${item.articleSlug}-${item.id}`} className="border border-white/[0.06] bg-[#111] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-sm font-bold uppercase">{item.name}</p>
                      <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/25">{formatDate(item.createdAt)}</p>
                    </div>
                    {item.articleSlug ? (
                      <Link href={`/article/${item.articleSlug}`} className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#e84c30] hover:underline">
                        Open article
                      </Link>
                    ) : null}
                  </div>
                  {item.articleTitle ? <p className="mt-4 text-sm font-bold text-white/70">{item.articleTitle}</p> : null}
                  <p className="mt-3 text-sm leading-7 text-white/40">{item.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-dashed border-white/[0.08] bg-[#111] p-8 text-center">
              <h2 className="font-mono text-xl font-bold uppercase tracking-[0.02em]">No comments yet</h2>
              <p className="mt-2 text-sm text-white/35">Add a comment on any article page and it will appear here.</p>
            </div>
          )}

          {filtered.length > COMMENTS_PER_PAGE ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-white/[0.06] bg-[#111] p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button type="button" className="border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 disabled:opacity-40" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
                <button type="button" className="border border-white/[0.08] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 disabled:opacity-40" disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
