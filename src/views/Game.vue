<template>
<div class="flex-along">
	<Board :flipped="flipped" />
	<div class="m-1  flex-against justify-between">
		<button class="big" @click="flipped = !flipped">{{ flipped ? 'Unflip' : 'Flip' }}</button>
		<button class="big" @click="onReset">Reset</button>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Board from '@/components/Board.vue'

import store from '@/store'

export default Vue.extend({
	components: {
		Board,
	},

	data () {
		return {
			flipped: false,
		}
	},

	methods: {
		onReset () {
			store.state.setup = true
		},
	},
})
</script>

<style lang="postcss">
.big {
	@apply m-1;
}
</style>
