import { describe, expect, it } from 'vitest'
import { getFirebaseConfig } from './config'

const validEnv = {
  VITE_FIREBASE_API_KEY: 'api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'auth-domain',
  VITE_FIREBASE_DATABASE_URL: 'database-url',
  VITE_FIREBASE_PROJECT_ID: 'project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'storage-bucket',
  VITE_FIREBASE_APP_ID: 'app-id',
}

describe('getFirebaseConfig', () => {
  it('maps all env vars onto the firebase config object', () => {
    expect(getFirebaseConfig(validEnv)).toEqual({
      apiKey: 'api-key',
      authDomain: 'auth-domain',
      databaseURL: 'database-url',
      projectId: 'project-id',
      storageBucket: 'storage-bucket',
      appId: 'app-id',
    })
  })

  it('throws a clear error listing which values are missing', () => {
    const incompleteEnv = { ...validEnv, VITE_FIREBASE_API_KEY: '' }
    expect(() => getFirebaseConfig(incompleteEnv)).toThrow(
      /VITE_FIREBASE_API_KEY/,
    )
  })
})
