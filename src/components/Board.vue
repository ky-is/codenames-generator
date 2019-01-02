<template>
<div>
	<div v-for="row in rows" :key="row" class="row">
		<div v-for="col in 5" :key="col" class="square" :class="colorClassAt(row, col)" />
	</div>
</div>
</template>

<script lang="ts">
import seedrandom, { prng } from 'seedrandom'
import Vue from 'vue'

import store from '@/store'

// const SQUARE_NEUTRAL = 0
const SQUARE_TEAM_1 = 1
const SQUARE_TEAM_2 = 2
const SQUARE_DEATH = 3

export default Vue.extend({
	computed: {
		seed (): string {
			return store.state.seed
		},
		rows (): number {
			return store.state.rows
		},
		mode (): string {
			return store.state.mode
		},
		team (): number {
			return store.state.team
		},

		isDuet (): boolean {
			return this.mode === 'Duet'
		},

		rngGenerator (): prng {
			return seedrandom(this.seed)
		},

		boardCount (): number {
			return 5 * this.rows
		},

		squares (): number[] {
			const board: number[] = new Array(this.boardCount).fill(0)
			const usedIndicies: boolean[] = []
			this.setRandomIndex(SQUARE_DEATH, board, usedIndicies, null)

			if (this.isDuet) {
				this.setRandomIndicies(SQUARE_TEAM_1, 3, board, usedIndicies, null)
				for (let side = 0; side < 2; side += 1) {
					this.setRandomIndicies(SQUARE_DEATH, 2, board, usedIndicies, side)
					this.setRandomIndicies(SQUARE_TEAM_1, 6, board, usedIndicies, side)
				}
			} else {
				this.setRandomIndicies(SQUARE_TEAM_1, 8, board, usedIndicies, null)
				this.setRandomIndicies(SQUARE_TEAM_2, 7, board, usedIndicies, null)
			}
			return board
		},
	},

	methods: {
		setRandomIndex (squareType: number, board: number[], used: boolean[], sideIndex: number | null) {
			let index
			do {
				const rng = this.rngGenerator()
				index = Math.floor(rng * this.boardCount)
			} while (used[index])
			used[index] = true
			if (sideIndex === null || sideIndex === this.team) {
				board[index] = squareType
			}
		},

		setRandomIndicies (squareType: number, count: number, board: number[], used: boolean[], sideIndex: number | null) {
			for (let n = 0; n < count; n += 1) {
				this.setRandomIndex(squareType, board, used, sideIndex)
			}
		},

		colorClassAt (row: number, col: number) {
			const index = (row - 1) * 5 + col - 1
			const square = this.squares[index]
			switch (square) {
			case 1:
				return this.isDuet ? 'bg-green' : 'bg-red-dark'
			case 2:
				return 'bg-blue-dark'
			case 3:
				return 'bg-black'
			default:
				return 'bg-grey-light'
			}
		},
	},
})
</script>

<style lang="postcss" scoped>
.row {
	@apply border-l border-grey-dark;
	@apply flex;
	&:first-child .square {
		@apply border-t;
	}
}

.square {
	@apply border-b border-r border-grey-dark;
	width: 20vmin;
	height: 20vmin;
}
</style>
