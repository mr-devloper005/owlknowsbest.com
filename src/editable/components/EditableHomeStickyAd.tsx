'use client'

import Image from 'next/image'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import vefogixStickyAd from '@/editable/assets/vefogix-sticky-ad.webp'

import { useState } from 'react'

const AD_URL = 'https://vefogix.com/'

export function EditableHomeStickyAd() {
  const [isOpen, setIsOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="fixed inset-x-0 bottom-0 z-[80] flex justify-center px-2 pb-[max(8px,env(safe-area-inset-bottom))] sm:px-4"
    >
      <div className="relative w-full max-w-[1120px]">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="owl-home-sticky-ad"
          className="absolute left-1/2 top-0 z-20 flex h-10 min-w-20 -translate-x-1/2 -translate-y-full items-center justify-center rounded-t-2xl border border-b-0 border-slate-300 bg-white px-5 text-slate-700 shadow-[0_-8px_20px_rgba(15,23,42,0.12)] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {isOpen ? <ChevronDown aria-hidden="true" size={24} /> : <ChevronUp aria-hidden="true" size={24} />}
          <span className="sr-only">{isOpen ? 'Collapse advertisement' : 'Expand advertisement'}</span>
        </button>

        {!isOpen ? (
          <div className="ml-auto flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Advertisement</span>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close advertisement"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        ) : (
          <div
            id="owl-home-sticky-ad"
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.28)]"
          >
            <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">
              Sponsored
            </span>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close advertisement"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <a
              href={AD_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block bg-white"
              aria-label="Explore Vefogix link building marketplace"
            >
              <Image
                src={vefogixStickyAd}
                alt="Vefogix pro-level link building and guest posting marketplace"
                sizes="(max-width: 768px) calc(100vw - 16px), 1120px"
                className="h-auto w-full"
                priority
              />
            </a>
          </div>
        )}
      </div>
    </aside>
  )
}
