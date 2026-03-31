<script setup>
import { computed, ref } from 'vue';
import { useSelectedStore } from '@/stores/selectedItems';

const selectedStore = useSelectedStore();
const treeItems = computed(() => {
    const content = selectedStore.artifact.content.content_json;
    const items = [];

    if (selectedStore.artifact.title === 'Strategic Alignment') {
        if (content.transformation) {
            items.push({
                id: 'transformation',
                title: 'Transformation',
                children: [{ id: 'transformation-val', title: content.transformation }]
            });
        }
        if (Array.isArray(content.supported_decisions) && content.supported_decisions.length > 0) {
            items.push({
                id: 'decisions',
                title: 'Supported Decisions',
                children: content.supported_decisions.map((d, i) => ({ id: `decision-${i}`, title: d }))
            });
        }
        if (Array.isArray(content.measurable_success) && content.measurable_success.length > 0) {
            items.push({
                id: 'success',
                title: 'Measurable Success',
                children: content.measurable_success.map((m, i) => ({
                    id: `success-${i}`,
                    title: `${m.metric} → ${m.target}`
                }))
            });
        }
        if (Array.isArray(content.out_of_scope) && content.out_of_scope.length > 0) {
            items.push({
                id: 'scope',
                title: 'Out of Scope',
                children: content.out_of_scope.map((s, i) => ({ id: `scope-${i}`, title: s }))
            });
        }
    }
    else if(selectedStore.artifact.title === 'Big Picture') {
        if (content.ecosystem_vision) {
            items.push({
                id: 'ecosystem',
                title: 'Ecosystem Vision',
                children: [{ id: 'ecosystem-val', title: content.ecosystem_vision }]
            });
        }
        if (content.success_definition) {
            items.push({
                id: 'success',
                title: 'Success Definition',
                children: [{ id: 'success-val', title: content.success_definition }]
            });
        }
        if (content.impacted_domains) {
            items.push({
                id: 'impacted',
                title: 'Impacted Domains',
                children: content.impacted_domains.map((d, i) => ({ id: `impacted-${i}`, title: `${d.name} -> ${d.description}` }))
            });
        }
    }
    return items;
});
</script>
<template>
    <v-treeview :items="treeItems" item-children="children" item-title="title" item-value="id" open-all color="primary">
        <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children" size="small">mdi-circle-small</v-icon>
            <!-- <v-icon v-else size="small">mdi-folder-outline</v-icon> -->
        </template>
    </v-treeview>
</template>
<style></style>
