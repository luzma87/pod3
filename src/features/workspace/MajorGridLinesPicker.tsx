import { useTranslation } from 'react-i18next'
import gridIcon from '../../assets/icons/028-grid.svg'

export type MajorGridInterval = 0 | 5 | 10

interface MajorGridLinesPickerProps {
  value: MajorGridInterval
  onChange: (value: MajorGridInterval) => void
}

function MajorGridLinesPicker({ value, onChange }: MajorGridLinesPickerProps) {
  const { t } = useTranslation()

  return (
    <label className="flex items-center gap-2">
      <img src={gridIcon} alt="" className="h-4 w-4" />
      <span className="text-sm text-ink-muted">
        {t('workspace.majorGridLinesLabel')}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value) as MajorGridInterval)
        }
        className="rounded-md border border-border bg-parchment-dark px-3 py-2 text-ink"
      >
        <option value={0}>{t('workspace.majorGridLinesOff')}</option>
        <option value={5}>
          {t('workspace.majorGridLinesEvery', { count: 5 })}
        </option>
        <option value={10}>
          {t('workspace.majorGridLinesEvery', { count: 10 })}
        </option>
      </select>
    </label>
  )
}

export default MajorGridLinesPicker
