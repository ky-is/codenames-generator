<template>
<section>
	<h1 class="mt-8 mb-6">Codenames Setup</h1>
	<div class="row">
		<h2>Seed:</h2>
		<input v-model="seed" :placeholder="timeSeed.toLocaleString()" class="block w-full h-12 text-center text-2xl text-grey-darker font-light border-t border-b">
		<p class="hint">Set to the same value as your {{ termForOpponent }}. The default value is a new seed every 15 minutes.</p>
	</div>
	<div class="row">
		<h2>Game mode:</h2>
		<UISegmented :data="[ ['Classic'], ['Duet'] ]" mutation="mode" />
	</div>
	<div class="row">
		<h2>Board size:</h2>
		<UISegmented :data="[ [4, '4x5'], [5, '5x5'] ]" mutation="rows" />
	</div>
	<div class="row">
		<h2>Your team:</h2>
		<UISegmented :data="[ [0, 'First'], [1, 'Second'] ]" mutation="team" />
		<p class="hint">Set to the opposite of your {{ termForOpponent }}!</p>
	</div>
	<button class="big  block mx-auto mb-8" @click="onSubmit">Generate</button>
</section>
</template>

<script lang="ts">
import Vue from 'vue'

import UISegmented from '@/components/ui/Segmented.vue'

import store from '@/store'

export default Vue.extend({
	components: {
		UISegmented,
	},

	data () {
		return {
			seed: '',
		}
	},

	computed: {
		mode () {
			return store.state.mode
		},
		isDuet (): boolean {
			return this.mode === 'Duet'
		},
		termForOpponent () {
			return this.isDuet ? 'partner' : 'opponent'
		},

		timeSeed () {
			const intervalMS = 60 * 15 * 1000
			return new Date(Math.floor(Date.now() / intervalMS) * intervalMS)
		},
	},

	mounted () {
		const dateParse = Date.parse(store.state.seed)
		if (dateParse && isNaN(dateParse)) {
			this.seed = store.state.seed
		} else {
			this.seed = ''
		}
	},

	methods: {
		onSubmit () {
			store.set('seed', this.seed || this.timeSeed.toString())
			store.state.setup = false
		},
	},
})
</script>

<style lang="postcss" scoped>
.row {
	@apply mb-4;
}

.hint {
	@apply mt-px text-grey-dark text-center italic;
}

h2 {
	@apply mb-px;
}
</style>
