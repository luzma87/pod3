import { useTranslation } from 'react-i18next'
import measuringTapeIcon from '../../assets/icons/026-measuring-tape.svg'
import { QUILT_SIZES, type QuiltSizeKey } from './quiltSizes'

interface QuiltSizePickerProps {
  value: QuiltSizeKey
  onChange: (key: QuiltSizeKey) => void
}

function QuiltSizePicker({ value, onChange }: QuiltSizePickerProps) {
  const { t } = useTranslation()

  return (
    <label className="flex items-center gap-2">
      <img src={measuringTapeIcon} alt="" className="h-4 w-4" />
      <span className="text-sm text-ink-muted">{t('workspace.sizeLabel')}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as QuiltSizeKey)}
        className="rounded-md border border-border bg-parchment-dark px-3 py-2 text-ink"
      >
        {(Object.keys(QUILT_SIZES) as QuiltSizeKey[]).map((key) => {
          const size = QUILT_SIZES[key]
          return (
            <option key={key} value={key}>
              {`${t(`workspace.sizes.${size.labelKey}`)} [${size.width}"x${size.height}"]`}
            </option>
          )
        })}
      </select>
    </label>
  )
}

export default QuiltSizePicker
