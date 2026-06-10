'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <EditableSiteShell className="bg-white text-[var(--slot4-page-text)]">
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-0">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="border-l-[3px] border-[var(--slot4-accent)] bg-[#f4f4f4] p-5">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[var(--editable-border)] bg-[#f7f7f7] p-6">
            <h2 className="text-2xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
