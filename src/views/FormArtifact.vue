<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FormCompArtifact from '@/components/form/FormCompArtifact.vue';

const page = ref({ title: 'Sample Page' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'New Project',
        disabled: false,
        href: '/FormProject'
    },
    {
        text: 'New Artifact',
        disabled: true,
        href: '/FormArtifact'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Artifact">
                <v-col>
                    <FormCompArtifact />
                </v-col>    
            </UiParentCard>
        </v-col>
        
    </v-row>
</template>
