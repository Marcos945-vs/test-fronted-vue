<script setup lang="ts">
import { useSelectedStore } from '@/stores/selectedItems';
const selectedStore = useSelectedStore();
</script>

<template>
    <h2 class="text-h6 pa-2 ma-2">This type of artifact is not assigned to {{ selectedStore.project?.name }}</h2>
    <v-btn class="pa-2 ma-2" @click="$router.push('/FormArtifact')">Create Artifact</v-btn>
</template>

