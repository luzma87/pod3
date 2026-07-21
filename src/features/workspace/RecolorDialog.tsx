import { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import type { ColorOverride, PlacedBlock } from '../../store/designerStore'
import ColorSwatchPicker from './ColorSwatchPicker'

const PREVIEW_WIDTH = 200
// matches the animation-duration * iteration-count of .recolor-part-blink
const BLINK_DURATION_MS = 800

interface Part {
  className: string
  color: string
  type: 'fill' | 'stroke'
}

interface LabeledPart extends Part {
  label: string
}

interface PartGroup {
  key: string
  label: string
  members: LabeledPart[]
}

type PartRow =
  | { kind: 'standalone'; part: LabeledPart }
  | { kind: 'group'; group: PartGroup }

function humanizePartName(className: string) {
  const spaced = className.replace(/-/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

// Groups parts that share a leading run of hyphen-separated segments, e.g.
// gold-bars-dark/medium/light -> group "Gold bars" with members
// Dark/Medium/Light. Picks the deepest shared prefix that still leaves every
// member with a non-empty label, so e.g. book1 + book1-detail (where book1
// has nothing left to show once "book1" is the group name) stay standalone
// instead of forming a group with a blank-looking member.
function findGroupKey(part: Part, allParts: Part[]): string | null {
  const segments = part.className.split('-')
  for (let length = segments.length - 1; length >= 1; length--) {
    const prefix = segments.slice(0, length).join('-')
    const memberCount = allParts.filter((candidate) => {
      const candidateSegments = candidate.className.split('-')
      return (
        candidateSegments.length > length &&
        candidateSegments.slice(0, length).join('-') === prefix
      )
    }).length
    if (memberCount >= 2) return prefix
  }
  return null
}

function buildPartRows(parts: Part[]): PartRow[] {
  const rows: PartRow[] = []
  const groupsByKey = new Map<string, PartGroup>()

  parts.forEach((part) => {
    const groupKey = findGroupKey(part, parts)
    const label = humanizePartName(
      groupKey ? part.className.slice(groupKey.length + 1) : part.className,
    )
    if (!groupKey) {
      rows.push({ kind: 'standalone', part: { ...part, label } })
      return
    }
    let group = groupsByKey.get(groupKey)
    if (!group) {
      group = { key: groupKey, label: humanizePartName(groupKey), members: [] }
      groupsByKey.set(groupKey, group)
      rows.push({ kind: 'group', group })
    }
    group.members.push({ ...part, label })
  })

  return rows
}

const COLORABLE_SELECTOR =
  'path, line, polyline, polygon, ellipse, circle, rect'

function scanParts(container: HTMLElement): Part[] {
  const parts = new Map<string, Part>()
  Array.from(container.querySelectorAll(COLORABLE_SELECTOR)).forEach(
    (element) => {
      const className = element.getAttribute('class')
      if (!className) return
      const fill = element.getAttribute('fill')
      const stroke = element.getAttribute('stroke')
      let color: string | null = null
      let type: 'fill' | 'stroke' = 'fill'
      if (fill) {
        color = fill
        type = 'fill'
      }
      if (stroke) {
        color = stroke
        type = 'stroke'
      }
      if (color) parts.set(className, { className, color, type })
    },
  )
  return Array.from(parts.values())
}

function applyOverrides(
  container: HTMLElement,
  overrides: Record<string, ColorOverride>,
) {
  Object.entries(overrides).forEach(([className, override]) => {
    Array.from(container.getElementsByClassName(className)).forEach(
      (element) => {
        element.setAttribute(override.type, override.color)
      },
    )
  })
}

interface RecolorDialogProps {
  placed: PlacedBlock | null
  onSave: (overrides: Record<string, ColorOverride>) => void
  onClose: () => void
}

function RecolorDialog({ placed, onSave, onClose }: RecolorDialogProps) {
  const { t } = useTranslation()
  const [previewNode, setPreviewNode] = useState<HTMLDivElement | null>(null)
  const [parts, setParts] = useState<Part[]>([])
  const [pendingOverrides, setPendingOverrides] = useState<
    Record<string, ColorOverride>
  >({})
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  useLayoutEffect(() => {
    // Radix's Dialog.Portal mounts its content one tick after the initial
    // render, so this also re-runs once `previewNode` actually attaches
    // (rather than only depending on `placed`, which could fire too early).
    if (!placed || !previewNode) return
    applyOverrides(previewNode, placed.colorOverrides)
    const scanned = scanParts(previewNode)
    setParts(scanned)
    setPendingOverrides({ ...placed.colorOverrides })
    setSelectedPart(scanned[0]?.className ?? null)
    setExpandedGroups(new Set())
  }, [placed, previewNode])

  useEffect(() => {
    if (!previewNode || !selectedPart) return
    const elements = Array.from(
      previewNode.getElementsByClassName(selectedPart),
    )
    elements.forEach((element) => element.classList.add('recolor-part-blink'))
    const timeout = setTimeout(() => {
      elements.forEach((element) =>
        element.classList.remove('recolor-part-blink'),
      )
    }, BLINK_DURATION_MS)
    return () => {
      clearTimeout(timeout)
      elements.forEach((element) =>
        element.classList.remove('recolor-part-blink'),
      )
    }
  }, [selectedPart, previewNode])

  if (!placed) return null

  const handleSelectColor = (color: string) => {
    if (!selectedPart) return
    const type =
      parts.find((part) => part.className === selectedPart)?.type ?? 'fill'
    setPendingOverrides((current) => ({
      ...current,
      [selectedPart]: { color, type },
    }))
    if (previewNode) {
      Array.from(previewNode.getElementsByClassName(selectedPart)).forEach(
        (element) => {
          element.setAttribute(type, color)
        },
      )
    }
  }

  const toggleGroup = (key: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const previewHeight =
    PREVIEW_WIDTH * (placed.block.size.height / placed.block.size.width)
  const rows = buildPartRows(parts)

  const renderPartButton = (part: LabeledPart) => {
    const currentColor = pendingOverrides[part.className]?.color ?? part.color
    return (
      <button
        key={part.className}
        type="button"
        onClick={() => setSelectedPart(part.className)}
        className={`flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-sm ${
          selectedPart === part.className ? 'border-maroon' : 'border-border'
        }`}
      >
        {part.label}
        <span
          className="h-4 w-4 rounded-sm border border-border"
          style={{ backgroundColor: currentColor }}
        />
      </button>
    )
  }

  return (
    <Dialog
      open={placed !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      title={t('workspace.recolorDialogTitle')}
      maxWidthClassName="max-w-2xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t('workspace.recolorCancel')}
          </Button>
          <Button onClick={() => onSave(pendingOverrides)}>
            {t('workspace.recolorSave')}
          </Button>
        </div>
      }
    >
      <div className="flex gap-4">
        <div ref={setPreviewNode} data-testid="recolor-preview">
          {placed.block.element({
            width: PREVIEW_WIDTH,
            height: previewHeight,
          })}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {rows.map((row) => {
              if (row.kind === 'standalone') {
                return renderPartButton(row.part)
              }
              const { group } = row
              const expanded = expandedGroups.has(group.key)
              return (
                <div key={group.key} className="contents">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => toggleGroup(group.key)}
                    className="flex cursor-pointer items-center gap-1 rounded-md border border-border px-2 py-1 text-sm"
                  >
                    <span aria-hidden="true">{expanded ? '▾' : '▸'}</span>
                    {group.label}
                  </button>
                  {expanded && (
                    <div className="flex w-full flex-wrap gap-2 pl-4">
                      {group.members.map((member) => renderPartButton(member))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <ColorSwatchPicker onSelect={handleSelectColor} />
        </div>
      </div>
    </Dialog>
  )
}

export default RecolorDialog
