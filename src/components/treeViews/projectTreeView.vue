<script setup>
import { computed } from 'vue';

const props = defineProps({
    treeData: Object
});
const treeItems = computed(() => {
    if (!props.treeData) return [];
    const project = props.treeData;
    const items = [];
    if (project.name) {
        items.push({
            id: 'name',
            title: 'Name',
            children: [{ id: 'name-val', title: project.name }]
        });
    }
    if (project.status) {
        items.push({
            id: 'status',
            title: 'Status',
            children: [{ id: 'status-val', title: project.status }]
        });
    }
    if (project.client_name) {
        items.push({
            id: 'client',
            title: 'Client',
            children: [{ id: 'client-val', title: project.client_name }]
        });
    }
    if (project.description) {
        items.push({
            id: 'description',
            title: 'Description',
            children: [{ id: 'description-val', title: project.description }]
        });
    }

    return items;
});
</script>
<template>
    <v-treeview :items="treeItems" item-children="children" item-title="title" item-value="id" open-all color="primary">
        <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children" size="small">mdi-arrow-right-thick</v-icon>
            <!-- <v-icon v-else size="small">mdi-folder-outline</v-icon> -->
        </template>
    </v-treeview>
</template>
