<template>
	<div class="flex-along">
		<Board :flipped="flipped" />
		<div class="m-1  flex-against justify-between">
			<button class="big" @click="flipped = !flipped">{{ flipped ? 'Unflip' : 'Flip' }}</button>
			<button class="big" @click="onReset">Reset</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Board from '/@/views/components/Board.vue'

import { setInSetup } from '/@/helpers/store'

const flipped = ref(false)

function onReset () {
	setInSetup(true)
}
</script>

<style lang="postcss">
.big {
	@apply m-1;
}
</style>
