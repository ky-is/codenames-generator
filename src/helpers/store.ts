import { reactive, readonly } from 'vue'

import storage from '/@/helpers/storage'

export type Key = 'seed' | 'mode' | 'team' | 'rows'

const mutableState = reactive({
	setup: true,
	seed: '',
	mode: storage.get('mode', 'Classic'),
	team: storage.getInt('team', 0),
	rows: storage.getInt('rows', 5),
})

export const state = readonly(mutableState)

export function setInSetup (setup: boolean) {
	mutableState.setup = setup
}

export function setKey (key: Key, value: any) {
	(mutableState[key] as any) = value
	storage.set(key, value)
}
