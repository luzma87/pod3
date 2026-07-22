import { ref, set } from 'firebase/database'
import type { SerializedQuilt } from '../features/workspace/serializeQuilt'
import { database } from './client'

export async function saveQuilt(
  quiltId: string,
  quilt: SerializedQuilt,
): Promise<void> {
  await set(ref(database, `quilts/${quiltId}`), quilt)
}
