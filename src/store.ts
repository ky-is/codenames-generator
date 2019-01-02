import storage from '@/helpers/storage'

const state = {
	setup: true,
	seed: '',
	mode: storage.get('mode', 'Classic'),
	team: storage.getInt('team', 0),
	rows: storage.getInt('rows', 5),
}

export default {
	state,

	set (key: 'seed' | 'mode' | 'team' | 'rows', value: any) {
		state[key] = value
		storage.set(key, value)
	},
}
