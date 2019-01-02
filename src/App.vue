<template>
<div id="app">
	<Setup v-if="inSetup" />
	<div v-else class="flex-along">
		<Board :flipped="flipped" />
		<div class="m-2  flex-against justify-between">
			<button class="big half" @click="flipped = !flipped">{{ flipped ? 'Unflip' : 'Flip' }}</button>
			<button class="big half" @click="onReset">Reset</button>
		</div>
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

	data () {
		return {
			flipped: true,
		}
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

h1, h2, h3, p {
	@apply px-3 font-light;
}

button, input {
	@apply outline-none !important;
}

button {
	@apply inline-block;
	&.big {
		@apply bg-grey px-4 h-12 rounded-lg text-3xl;
		width: 160px;
	}
	&.half {
		max-width: calc(50% - 4px);
	}
}

.flex-along, .flex-against {
	@apply flex;
}
.flex-against {
	@apply flex-col;
}
.space-against {
	@apply mt-2;
}
@media (max-aspect-ratio: 1/1) {
	.space-against {
		@apply mt-0 ml-2;
	}
	.flex-along {
		@apply flex-col;
	}
	.flex-against {
		@apply flex-row;
	}
}
</style>
