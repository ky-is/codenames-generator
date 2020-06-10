<template>
<div class="board" :class="{ flipped }">
	<div v-for="row in rows" :key="row" class="row">
		<template v-for="col in COLUMN_COUNT">
			<Let :key="col" v-slot="{ square }" :square="squareAt(row, col)">
				<div class="square" :class="colorClassFor(square)">
					<div v-if="square === SQUARE_DEATH" class="text-6xl text-grey-light">☠</div>
				</div>
			</Let>
		</template>
	</div>
</div>
</template>

<script lang="ts">
import seedrandom, { prng } from 'seedrandom' // eslint-disable-line no-unused-vars
import Vue from 'vue'

import store from '@/helpers/store'

import TemplateVariable from '@/views/components/ui/TemplateVariable.vue'

const SQUARE_NEUTRAL = 0
const SQUARE_TEAM_1 = 1
const SQUARE_TEAM_2 = 2
const SQUARE_DEATH = 3
const COLUMN_COUNT = 5

export default Vue.extend({
	components: {
		Let: TemplateVariable,
	},

	props: {
		flipped: {
			type: Boolean,
			required: true,
		},
	},

	data () {
		return {
			SQUARE_DEATH,
			COLUMN_COUNT,
		}
	},

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
			return seedrandom(this.seed.toLowerCase())
		},

		boardCount (): number {
			return 5 * this.rows
		},

		squares (): number[] {
			const board: number[] = new Array(this.boardCount).fill(SQUARE_NEUTRAL)
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

		squareAt (row: number, col: number): number {
			const index = (row - 1) * COLUMN_COUNT + (col - 1)
			return this.squares[index]
		},

		colorClassFor (square: number): string {
			switch (square) {
			case SQUARE_TEAM_1:
				return this.isDuet ? 'bg-green' : 'bg-red-dark'
			case SQUARE_TEAM_2:
				return 'bg-blue-dark'
			case SQUARE_DEATH:
				return 'bg-black'
			case SQUARE_NEUTRAL:
				return 'bg-grey-light'
			default:
				throw new Error('Invalid square')
			}
		},
	},
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
	@apply border-l border-grey-dark;
	@apply flex;
	&:first-child .square {
		@apply border-t;
	}
}

.square {
	@apply border-b border-r border-grey-dark  flex justify-center items-center;
	width: 20vmin;
	height: 20vmin;
}
</style>