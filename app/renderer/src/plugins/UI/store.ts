import uuid from 'uuid/v4'
import { basename, extname } from 'path'

export const GLOBAL_UI = new Map<string, any>()

export type TUIStore = ReturnType<typeof createUIStore>
export function createUIStore() {
	let UI: any = {}
	let storeUUID = uuid()

	GLOBAL_UI.set(storeUUID, UI)

	return {
		get UI() {
			console.log(UI)
			return UI
		},
		set(path: string[], component: () => Promise<unknown>) {
			let current = UI

			while (path.length > 1) {
				const key = path.shift()
				if (current[key] === undefined) current[key] = {}

				current = current[key]
			}

			const key = path.shift()
			current[basename(key, extname(key))] = component
		},
		dispose() {
			UI = null
			storeUUID = null
			GLOBAL_UI.delete(storeUUID)
		},
	}
}
