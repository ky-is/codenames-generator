<template>
	<Setup v-if="inSetup" />
	<Game v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Game from '/@/views/pages/Game.vue'
import Setup from '/@/views/pages/Setup.vue'

import { state } from '/@/helpers/store'

const inSetup = computed(() => state.setup || !state.seed)
</script>
