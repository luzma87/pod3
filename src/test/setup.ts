import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import i18n from '../i18n/i18n'
import { resetDesignerStore } from '../store/designerStore'

if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove('dark')
  i18n.changeLanguage('en')
  resetDesignerStore()
})
