import { useTranslation } from 'react-i18next'
import { MATERIAL_PALETTE } from './colorPalette'

interface ColorSwatchPickerProps {
  onSelect: (color: string) => void
}

function ColorSwatchPicker({ onSelect }: ColorSwatchPickerProps) {
  const { t } = useTranslation()

  return (
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
  )
}

export default ColorSwatchPicker
