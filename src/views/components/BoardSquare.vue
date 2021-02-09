<template>
	<div class="square" :class="colorClassFor(square)">
		<div v-if="square === SQUARES.DEATH" class="text-6xl text-gray-700">☠</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import { state } from '/@/helpers/store'

import { SQUARES, COLUMN_COUNT } from '/@/helpers/constants'

const props = defineProps<{
	squares: number[]
	row: number
	col: number
}>()

const square = computed (() => {
	const index = (props.row - 1) * COLUMN_COUNT + (props.col - 1)
	return props.squares[index]
})

const isDuet = computed(() => state.mode === 'Duet')

function colorClassFor (square: number): string {
	switch (square) {
	case SQUARES.TEAM_1:
		return this.isDuet ? 'bg-green' : 'bg-red-400'
	case SQUARES.TEAM_2:
		return 'bg-blue-400'
	case SQUARES.DEATH:
		return 'bg-black'
	case SQUARES.NEUTRAL:
		return 'bg-gray-400'
	default:
		throw new Error('Invalid square')
	}
}
</script>

<style lang="postcss" scoped>
.square {
	@apply border-b border-r border-gray-300  flex justify-center items-center;
	width: 20vmin;
	height: 20vmin;
}
</style>
