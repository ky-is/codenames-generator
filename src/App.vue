<template>
<div id="app">
	<Setup v-if="inSetup" />
	<Game v-else />
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Game from '@/views/Game.vue'
import Setup from '@/views/Setup.vue'

import store from '@/store'

export default Vue.extend({
	components: {
		Game,
		Setup,
	},

	computed: {
		inSetup (): boolean {
			return store.state.setup || !store.state.seed
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
