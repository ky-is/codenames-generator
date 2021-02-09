<template>
	<section>
		<h1 class="mt-8 mb-6">Codenames Setup</h1>
		<div class="row">
			<h2>Seed:</h2>
			<input v-model="seed" :placeholder="timeSeed.toLocaleString()" class="block w-full h-12 text-center text-2xl text-gray-200 font-light border-t border-b">
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
		<div v-if="isDuet" class="row">
			<h2>Your team:</h2>
			<UISegmented :data="[ [0, 'First'], [1, 'Second'] ]" mutation="team" />
			<p class="hint">Set to the opposite of your {{ termForOpponent }}!</p>
		</div>
		<button class="big  block mx-auto my-6" @click="onSubmit">Generate</button>
	</section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import UISegmented from '/@/views/components/ui/Segmented.vue'

import { state, setKey, setInSetup } from '/@/helpers/store'

const seed = ref('')
const isDuet = computed(() => state.mode === 'Duet')
const termForOpponent = computed(() => (isDuet.value ? 'partner' : 'opponent'))

const timeSeed = computed(() => {
	const intervalMS = 60 * 15 * 1000
	return new Date(Math.floor(Date.now() / intervalMS) * intervalMS)
})

onMounted(() => {
	const dateParse = Date.parse(state.seed)
	if (dateParse && isNaN(dateParse)) {
		seed.value = state.seed
	}
})

function onSubmit () {
	setKey('seed', seed.value || timeSeed.value.toString())
	setInSetup(false)
}
</script>

<style lang="postcss" scoped>
.row {
	@apply mb-4;
}

.hint {
	@apply mt-px text-gray-300 text-center italic;
}

h2 {
	@apply mb-px;
}
</style>
