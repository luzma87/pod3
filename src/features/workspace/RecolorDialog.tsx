import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import type { ColorOverride, PlacedBlock } from '../../store/designerStore'
import ColorSwatchPicker from './ColorSwatchPicker'

const PREVIEW_WIDTH = 200

interface Part {
  className: string
  color: string
  type: 'fill' | 'stroke'
}

function humanizePartName(className: string) {
  const spaced = className.replace(/-/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function scanParts(container: HTMLElement): Part[] {
  const parts = new Map<string, Part>()
  Array.from(container.querySelectorAll('path')).forEach((path) => {
    const className = path.getAttribute('class')
    if (!className) return
    const fill = path.getAttribute('fill')
    const stroke = path.getAttribute('stroke')
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
  })
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
  }, [placed, previewNode])

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

  const previewHeight =
    PREVIEW_WIDTH * (placed.block.size.height / placed.block.size.width)

  return (
    <Dialog
      open={placed !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      title={t('workspace.recolorDialogTitle')}
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
            {parts.map((part) => {
              const currentColor =
                pendingOverrides[part.className]?.color ?? part.color
              return (
                <button
                  key={part.className}
                  type="button"
                  onClick={() => setSelectedPart(part.className)}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-sm ${
                    selectedPart === part.className
                      ? 'border-maroon'
                      : 'border-border'
                  }`}
                >
                  {humanizePartName(part.className)}
                  <span
                    className="h-4 w-4 rounded-sm border border-border"
                    style={{ backgroundColor: currentColor }}
                  />
                </button>
              )
            })}
          </div>
          <ColorSwatchPicker onSelect={handleSelectColor} />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t('workspace.recolorCancel')}
        </Button>
        <Button onClick={() => onSave(pendingOverrides)}>
          {t('workspace.recolorSave')}
        </Button>
      </div>
    </Dialog>
  )
}

export default RecolorDialog
