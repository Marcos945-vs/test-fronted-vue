<script setup lang="ts">
import { useSelectedStore } from '@/stores/selectedItems';
const selectedStore = useSelectedStore();
</script>

<template>
    <h2 class="text-h6 pa-2 ma-2">That type of Artifact dont' by asigneted to this {{ selectedStore.project?.name }}</h2>
    <v-btn class="pa-2 ma-2" @click="$router.push('/FormArtifact')">Create Artifact</v-btn>
</template>

