import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'
import allBlocks, { type QuiltBlock } from '../../assets/blocks/allBlocks'
import ErrorBoundary from '../../components/ui/ErrorBoundary'
import BlockThumbnail from './BlockThumbnail'

const MAX_SUGGESTIONS = 6

const blockSearchIndex = new Fuse(allBlocks, {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
})

const searchTerms = Array.from(
  new Set(allBlocks.flatMap((block) => [block.name, ...block.tags])),
)
const suggestionSearchIndex = new Fuse(searchTerms, {
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
})

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
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredBlocks = useMemo(() => {
    if (!query.trim()) return allBlocks
    return blockSearchIndex.search(query).map((result) => result.item)
  }, [query])

  const groupedBlocks = useMemo(
    () => groupByCategory(filteredBlocks),
    [filteredBlocks],
  )

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []
    return suggestionSearchIndex
      .search(query)
      .map((result) => result.item)
      .filter((term) => term.toLowerCase() !== normalizedQuery)
      .slice(0, MAX_SUGGESTIONS)
  }, [query])

  const showSuggestions = isSuggestionsOpen && suggestions.length > 0

  function selectSuggestion(term: string) {
    setQuery(term)
    setIsSuggestionsOpen(false)
    setActiveSuggestionIndex(-1)
    inputRef.current?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveSuggestionIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveSuggestionIndex(
        (index) => (index - 1 + suggestions.length) % suggestions.length,
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (activeSuggestionIndex >= 0) {
        selectSuggestion(suggestions[activeSuggestionIndex])
      } else {
        setIsSuggestionsOpen(false)
      }
    } else if (event.key === 'Escape') {
      setIsSuggestionsOpen(false)
      setActiveSuggestionIndex(-1)
    }
  }

  return (
    <aside className="flex h-full w-72 flex-col gap-3 border-r border-border p-4">
      <div className="relative">
        <label className="flex flex-col gap-1">
          <span className="sr-only">{t('catalog.searchLabel')}</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsSuggestionsOpen(true)
              setActiveSuggestionIndex(-1)
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            onBlur={() => setIsSuggestionsOpen(false)}
            onKeyDown={handleKeyDown}
            placeholder={t('catalog.searchPlaceholder')}
            className="rounded-md border border-border bg-parchment-dark px-3 py-2 text-ink"
            aria-expanded={showSuggestions}
            aria-controls="catalog-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={
              activeSuggestionIndex >= 0
                ? `catalog-suggestion-${activeSuggestionIndex}`
                : undefined
            }
          />
        </label>
        {showSuggestions && (
          <ul
            id="catalog-suggestions"
            role="listbox"
            aria-label={t('catalog.suggestionsLabel')}
            className="absolute z-10 mt-1 w-full rounded-md border border-border bg-parchment p-1 shadow-md"
          >
            {suggestions.map((term, index) => (
              <li
                key={term}
                id={`catalog-suggestion-${index}`}
                role="option"
                aria-selected={index === activeSuggestionIndex}
                onMouseDown={(event) => {
                  event.preventDefault()
                  selectSuggestion(term)
                }}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
                className={`cursor-pointer rounded-md px-2 py-1.5 text-sm text-ink ${
                  index === activeSuggestionIndex ? 'bg-gold-light' : ''
                }`}
              >
                {term}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-sm text-ink-muted">
        {t('catalog.resultCount', { count: filteredBlocks.length })}
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {[...groupedBlocks.entries()].map(([category, blocks]) => (
          <div key={category}>
            <h2 className="font-display text-sm text-maroon">
              {t(`catalog.categories.${category}`)}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {blocks.map((block) => (
                <ErrorBoundary
                  key={block.id}
                  fallback={() => (
                    <div className="flex w-24 flex-col items-center gap-1 rounded-md border border-maroon bg-maroon/10 p-2 text-center text-xs text-maroon">
                      {t('catalog.thumbnailError')}
                    </div>
                  )}
                >
                  <BlockThumbnail block={block} />
                </ErrorBoundary>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default BlockCatalog
