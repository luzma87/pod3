import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HoverCard } from 'radix-ui'
import type { PlacedBlock } from '../../store/designerStore'
import { useDesignerStore } from '../../store/designerStore'
import { SQUARE_SIZE } from './constants'

interface PlacedBlockViewProps {
  placed: PlacedBlock
  onRecolor: () => void
}

function PlacedBlockView({ placed, onRecolor }: PlacedBlockViewProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const deleteBlock = useDesignerStore((state) => state.deleteBlock)
  const flipBlock = useDesignerStore((state) => state.flipBlock)
  const rotateBlock = useDesignerStore((state) => state.rotateBlock)
  const grabBlock = useDesignerStore((state) => state.grabBlock)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    Object.entries(placed.colorOverrides).forEach(([className, override]) => {
      Array.from(container.getElementsByClassName(className)).forEach(
        (element) => {
          element.setAttribute(override.type, override.color)
        },
      )
    })
  }, [placed.colorOverrides])

  const width = placed.block.size.width * SQUARE_SIZE
  const height = placed.block.size.height * SQUARE_SIZE

  return (
    <HoverCard.Root openDelay={0} closeDelay={200}>
      <HoverCard.Trigger asChild>
        <div
          data-testid={`placed-block-${placed.instanceId}`}
          title={placed.block.name}
          className="pointer-events-auto absolute"
          style={{
            left: placed.position.x * SQUARE_SIZE,
            top: placed.position.y * SQUARE_SIZE,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            ref={containerRef}
            style={{
              transform: `scaleX(${placed.isFlipped ? -1 : 1}) rotate(${placed.rotation}deg)`,
            }}
          >
            {placed.block.element({ width, height })}
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          sideOffset={0}
          onClick={(event) => event.stopPropagation()}
          className="z-10 flex gap-1 rounded-md border border-border bg-parchment p-1 whitespace-nowrap shadow-md"
        >
          <button
            type="button"
            title={t('workspace.actions.flip')}
            aria-label={t('workspace.actions.flip')}
            onClick={() => flipBlock(placed.instanceId)}
            className="cursor-pointer"
          >
            ↔
          </button>
          <button
            type="button"
            title={t('workspace.actions.rotate')}
            aria-label={t('workspace.actions.rotate')}
            onClick={() => rotateBlock(placed.instanceId)}
            className="cursor-pointer"
          >
            ↻
          </button>
          <button
            type="button"
            title={t('workspace.actions.move')}
            aria-label={t('workspace.actions.move')}
            onClick={() => grabBlock(placed.instanceId)}
            className="cursor-pointer"
          >
            🪶
          </button>
          <button
            type="button"
            title={t('workspace.actions.recolor')}
            aria-label={t('workspace.actions.recolor')}
            onClick={onRecolor}
            className="cursor-pointer"
          >
            🎨
          </button>
          <button
            type="button"
            title={t('workspace.actions.delete')}
            aria-label={t('workspace.actions.delete')}
            onClick={() => deleteBlock(placed.instanceId)}
            className="cursor-pointer"
          >
            🗑
          </button>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default PlacedBlockView
