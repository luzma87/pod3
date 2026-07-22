import { get, ref, set } from 'firebase/database'
import type { SerializedQuilt } from '../features/workspace/serializeQuilt'
import { database } from './client'

export async function saveQuilt(
  quiltId: string,
  quilt: SerializedQuilt,
): Promise<void> {
  await set(ref(database, `quilts/${quiltId}`), quilt)
}

export async function loadQuilt(quiltId: string): Promise<unknown> {
  const snapshot = await get(ref(database, `quilts/${quiltId}`))
  return snapshot.exists() ? snapshot.val() : null
}
