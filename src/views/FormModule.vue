<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FormCompModule from '@/components/form/FormCompModule.vue';

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
        text: 'New Module',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Module">
                <v-col>
                    <FormCompModule />
                </v-col>    
            </UiParentCard>
        </v-col>
        
    </v-row>
</template>
