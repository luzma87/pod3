import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import allBlocks, { type QuiltBlock } from '../../assets/blocks/allBlocks'
import BlockThumbnail from './BlockThumbnail'

function matchesQuery(block: QuiltBlock, query: string) {
  if (!query) return true
  const normalizedQuery = query.toLowerCase()
  if (block.name.toLowerCase().includes(normalizedQuery)) return true
  return block.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
}

function groupByCategory(blocks: QuiltBlock[]) {
  const groups = new Map<QuiltBlock['category'], QuiltBlock[]>()
  blocks.forEach((block) => {
    const group = groups.get(block.category) ?? []
    group.push(block)
    groups.set(block.category, group)
  })
  return groups
}

function BlockCatalog() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const filteredBlocks = useMemo(
    () => allBlocks.filter((block) => matchesQuery(block, query)),
    [query],
  )
  const groupedBlocks = useMemo(
    () => groupByCategory(filteredBlocks),
    [filteredBlocks],
  )

  return (
    <aside className="flex h-full w-72 flex-col gap-3 border-r border-border p-4">
      <label className="flex flex-col gap-1">
        <span className="sr-only">{t('catalog.searchLabel')}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('catalog.searchPlaceholder')}
          className="rounded-md border border-border bg-parchment-dark px-3 py-2 text-ink"
        />
      </label>
      <p className="text-sm text-ink-muted">
        {t('catalog.resultCount', { count: filteredBlocks.length })}
      </p>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {[...groupedBlocks.entries()].map(([category, blocks]) => (
          <div key={category}>
            <h2 className="font-display text-sm text-maroon">
              {t(`catalog.categories.${category}`)}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {blocks.map((block) => (
                <BlockThumbnail key={block.id} block={block} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default BlockCatalog
