<template>
<div id="app">
	<Setup v-if="inSetup" />
	<div v-else class="play">
		<Board />
		<button class="big my-4" @click="onReset">Reset</button>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Board from '@/components/Board.vue'
import Setup from '@/components/Setup.vue'

import store from '@/store'

export default Vue.extend({
	components: {
		Board,
		Setup,
	},

	computed: {
		inSetup (): boolean {
			return store.state.setup || !store.state.seed
		},
	},

	methods: {
		onReset () {
			store.state.setup = true
		},
	},
})
</script>

<style lang="postcss">
@import 'assets/styles/tailwind.postcss';

body {
	@apply font-sans font-light text-black;
}

h1, h2, h3 {
	@apply px-3 font-light;
}

button.big {
	@apply block mx-auto bg-grey px-4 h-12 rounded-lg text-3xl;
}

.play {
	@apply flex;
}
@media (max-aspect-ratio: 1/1) {
	.play {
		@apply flex-col;
	}
}
</style>
