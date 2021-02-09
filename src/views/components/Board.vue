<template>
	<div class="board" :class="{ flipped }">
		<div v-for="row in state.rows" :key="row" class="row">
			<BoardSquare v-for="col in COLUMN_COUNT" :key="col" :squares="squares" :row="row" :col="col" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import seedrandom from 'seedrandom'

import { state } from '/@/helpers/store'

import BoardSquare from '/@/views/components/BoardSquare.vue'

import { SQUARES, COLUMN_COUNT } from '/@/helpers/constants'

const props = defineProps<{
	flipped: boolean
}>()

const isDuet = computed(() => state.mode === 'Duet')

const rngGenerator = computed(() => seedrandom(state.seed.toLowerCase()))

const boardCount = computed(() => 5 * state.rows)

function setRandomIndex (squareType: number, board: number[], used: boolean[], sideIndex: number | null) {
	let index
	do {
		const rng = rngGenerator.value()
		index = Math.floor(rng * boardCount.value)
	} while (used[index])
	used[index] = true
	if (sideIndex === null || sideIndex === state.team) {
		board[index] = squareType
	}
}

function setRandomIndicies (squareType: number, count: number, board: number[], used: boolean[], sideIndex: number | null) {
	for (let n = 0; n < count; n += 1) {
		setRandomIndex(squareType, board, used, sideIndex)
	}
}

const squares = computed(() => {
	const boardData: number[] = new Array(boardCount.value).fill(SQUARES.NEUTRAL)
	const usedIndicies: boolean[] = []
	setRandomIndex(SQUARES.DEATH, boardData, usedIndicies, null)
	if (isDuet.value) {
		setRandomIndicies(SQUARES.TEAM_1, 3, boardData, usedIndicies, null)
		for (let side = 0; side < 2; side += 1) {
			setRandomIndicies(SQUARES.DEATH, 2, boardData, usedIndicies, side)
			setRandomIndicies(SQUARES.TEAM_1, 6, boardData, usedIndicies, side)
		}
	} else {
		setRandomIndicies(SQUARES.TEAM_1, 8, boardData, usedIndicies, null)
		setRandomIndicies(SQUARES.TEAM_2, 7, boardData, usedIndicies, null)
	}
	return boardData
})
</script>

<style lang="postcss" scoped>
.board {
	transition: transform 700ms;
	&.flipped {
		transform: rotate(180deg);
	}
}

.row {
	@apply border-l border-gray-300  flex;
	&:first-child * {
		@apply border-t;
	}
}
</style>
