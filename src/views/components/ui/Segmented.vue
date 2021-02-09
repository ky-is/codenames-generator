<template>
	<div class="ui-control">
		<span
			v-for="[ key, display ] in data" :key="key"
			class="control-content" :class="{ 'selected': key === value }"
			@click="onSelect(key)"
			v-html="display ?? key"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import { state, setKey } from '/@/helpers/store'
import type { Key } from '/@/helpers/store'

const props = defineProps<{
	data: [string | number, string?][]
	mutation: Key
}>()

const value = computed(() => state[props.mutation])

function onSelect (selection: string | number) {
	setKey(props.mutation, selection)
}
</script>

<style lang="postcss" scoped>
body:not(.dark) {
	& .control-content {
		@apply text-gray-400;
		&.selected {
			@apply bg-gray-400 text-white;
		}
		&:not(.selected):hover {
			@apply bg-gray-100;
			&:active {
				@apply bg-gray-200;
			}
		}
	}
}
body.dark {
	& .control-content {
		@apply text-gray-400;
		&.selected {
			@apply bg-gray-400 text-black;
		}
		&:not(.selected):hover {
			@apply bg-gray-900;
			&:active {
				@apply bg-gray-800;
			}
		}
	}
}

.ui-control {
	@apply mx-auto border-t border-b text-2xl overflow-hidden;
	@apply flex;
}

.control-content {
	@apply h-12 flex-grow flex-shrink cursor-pointer font-normal;
	@apply flex justify-center items-center;
	&.selected {
		@apply cursor-default font-semibold;
	}
	&.selected, &:hover:active {
		@apply border-transparent;
	}
	& + .control-content {
		@apply border-l;
	}
}
</style>
