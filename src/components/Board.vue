<template>
<div class="font-mono">
	<div v-for="row in rows + 1" :key="row">
		<div v-for="col in 5" :key="col" class="inline">
			{{ squares[(row - 1) * 5 + col - 1] }}
		</div>
	</div>
</div>
</template>

<script lang="ts">
import seedrandom, { prng } from 'seedrandom'
import Vue from 'vue'

// const SQUARE_NEUTRAL = 0
const SQUARE_TEAM_1 = 1
const SQUARE_TEAM_2 = 2
const SQUARE_DEATH = 3

export default Vue.extend({
	props: {
		seed: {
			type: String,
			required: true,
		},
		rows: {
			type: Number,
			required: true,
		},
		duet: {
			type: Boolean,
			required: true,
		},
		first: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		rngGenerator (): prng {
			return seedrandom(this.seed)
		},

		boardCount (): number {
			return 5 * this.rows
		},

		teamIndex (): number {
			return this.first ? 0 : 1
		},

		squares (): number[] {
			const board: number[] = new Array(this.boardCount).fill(0)
			const usedIndicies: boolean[] = []
			this.setRandomIndex(SQUARE_DEATH, board, usedIndicies, null)

			//TODO 4 rows
			if (this.duet) {
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
			if (sideIndex === null || sideIndex === this.teamIndex) {
				board[index] = squareType
			}
		},

		setRandomIndicies (squareType: number, count: number, board: number[], used: boolean[], sideIndex: number | null) {
			for (let n = 0; n < count; n += 1) {
				this.setRandomIndex(squareType, board, used, sideIndex)
			}
		},
	},
})
</script>

<style lang="postcss" scoped>
</style>
