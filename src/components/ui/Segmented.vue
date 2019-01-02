<template>
<div class="ui-control">
	<span
		v-for="[ key, display ] in data" :key="key"
		class="control-content" :class="{ 'selected': key === value }"
		@click="onSelect(key)"
		v-html="display || key"
	/>
</div>
</template>

<script>
import Vue from 'vue'

import store from '@/store'

export default Vue.extend({
	props: {
		data: {
			type: Array,
			required: true,
		},
		mutation: {
			type: String,
			required: true,
		},
	},

	computed: {
		value () {
			return store.state[this.mutation]
		},
	},

	methods: {
		onSelect (key) {
			store.set(this.mutation, key)
		},
	},
})
</script>

<style lang="postcss" scoped>
body:not(.dark) {
	& .control-content {
		@apply text-grey-dark;
		&.selected {
			@apply bg-grey-dark text-white;
		}
		&:not(.selected):hover {
			@apply bg-grey-lighter;
		}
	}
}
body.dark {
	& .control-content {
		@apply text-grey-dark;
		&.selected {
			@apply bg-grey-dark text-black;
		}
		&:not(.selected):hover {
			@apply bg-grey-darkest;
		}
	}
}

.ui-control {
	@apply mx-auto border-t border-b text-2xl overflow-hidden;
	@apply flex;
}

.control-content {
	@apply h-12 flex-grow flex-shrink cursor-pointer;
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
