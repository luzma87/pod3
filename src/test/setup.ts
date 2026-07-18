import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import i18n from '../i18n/i18n'
import { resetDesignerStore } from '../store/designerStore'

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove('dark')
  i18n.changeLanguage('en')
  resetDesignerStore()
})
