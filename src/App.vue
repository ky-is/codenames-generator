<template>
<div id="app">
	<Board :seed="''" :rows="5" :duet="true" :first="true" />
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Board from '@/components/Board.vue'

export default Vue.extend({
	components: {
		Board,
	},
})
</script>

<style lang="postcss">
@import 'assets/styles/tailwind.postcss';
</style>
