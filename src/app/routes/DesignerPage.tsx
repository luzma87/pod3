import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import BlockCatalog from '../../features/block-catalog/BlockCatalog'
import { deserializeQuilt } from '../../features/workspace/serializeQuilt'
import Workspace from '../../features/workspace/Workspace'
import { loadQuilt } from '../../firebase/quilts'
import { useDesignerStore } from '../../store/designerStore'

type LoadStatus = 'idle' | 'loading' | 'not-found' | 'error'

function DesignerPage() {
  const { t } = useTranslation()
  const { quiltId } = useParams()
  const storeQuiltId = useDesignerStore((state) => state.quiltId)
  const loadDesign = useDesignerStore((state) => state.loadDesign)
  const [status, setStatus] = useState<LoadStatus>('idle')

  useEffect(() => {
    // Already the currently-loaded/just-saved design (e.g. Save just
    // navigated here) — nothing to fetch.
    if (!quiltId || quiltId === storeQuiltId) return

    let cancelled = false
    setStatus('loading')
    loadQuilt(quiltId)
      .then((raw) => {
        if (cancelled) return
        const loaded = deserializeQuilt(raw)
        if (!loaded) {
          setStatus('not-found')
          return
        }
        loadDesign(quiltId, loaded)
        setStatus('idle')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [quiltId, storeQuiltId, loadDesign])

  return (
    <div className="flex h-full">
      <BlockCatalog />
      <main className="flex-1 overflow-y-auto p-8">
        {status === 'loading' && (
          <p className="text-ink-muted">{t('designer.quiltLoading')}</p>
        )}
        {status === 'not-found' && (
          <p className="text-maroon">{t('designer.quiltNotFound')}</p>
        )}
        {status === 'error' && (
          <p className="text-maroon">{t('designer.quiltLoadError')}</p>
        )}
        {status === 'idle' && !quiltId && (
          <p className="text-ink-muted">{t('designer.noQuiltLoaded')}</p>
        )}
        <div className="mt-6">
          <Workspace />
        </div>
      </main>
    </div>
  )
}

export default DesignerPage
