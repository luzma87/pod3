import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MATERIAL_PALETTE } from './colorPalette'

interface ColorSwatchPickerProps {
  onSelect: (color: string) => void
}

function ColorSwatchPicker({ onSelect }: ColorSwatchPickerProps) {
  const { t } = useTranslation()
  const customColorRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = customColorRef.current
    if (!input) return
    // React's onChange maps to the native "input" event for color inputs,
    // which fires continuously while dragging inside the picker. Listening
    // to "change" instead means we only act once the user commits a color,
    // instead of e.g. closing the paint dialog mid-drag.
    const handleChange = (event: Event) => {
      onSelect((event.target as HTMLInputElement).value)
    }
    input.addEventListener('change', handleChange)
    return () => input.removeEventListener('change', handleChange)
  }, [onSelect])

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-6 gap-2">
        {MATERIAL_PALETTE.map(({ color, labelKey }) => {
          const label = t(`workspace.colors.${labelKey}`)
          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelect(color)}
              title={label}
              aria-label={label}
              className="h-8 w-8 cursor-pointer rounded-md border border-border"
              style={{ backgroundColor: color }}
            />
          )
        })}
      </div>
      <label className="flex items-center gap-2 text-sm">
        {t('workspace.customColorLabel')}
        <input
          ref={customColorRef}
          type="color"
          aria-label={t('workspace.customColorLabel')}
          className="h-8 w-8 cursor-pointer rounded-md border border-border p-0"
        />
      </label>
    </div>
  )
}

export default ColorSwatchPicker
