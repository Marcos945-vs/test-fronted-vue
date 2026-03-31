<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FormArtifact from '@/components/form/FormArtifact.vue';
import { useSelectedStore } from '@/stores/selectedItems';

const selectedStore = useSelectedStore();
const page = ref({ title: 'Sample Page' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'List Projects',
        disabled: false,
        href: '/TableProject'
    },
    { 
        text: 'Details Projects', 
        disabled: false, 
        href: `/DetailsProject/${selectedStore.project?.name}/${selectedStore.artifact?.url}` },
    {
        text: `New ${selectedStore.artifact?.title}`,
        disabled: true,
        href: '/FormArtifact'
    }
]);

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="`Create ${selectedStore.artifact?.title}`">
                <v-col>
                    <FormArtifact />
                </v-col>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
