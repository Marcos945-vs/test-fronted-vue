<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ProjectDatatables, ModuleHeaders } from '@/_mockApis/dataTable';
const page = ref({ title: 'List Mudule' });
const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '/'
    },
    {
        text: 'List Modules',
        disabled: true,
        href: '#'
    }
]);

const search = ref();

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Modules">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line hide-details
                    class="mb-5" />
                <v-data-table items-per-page="5" :headers="ModuleHeaders"  :items="ProjectDatatables" :search="search"
                    class="border rounded-md">
                </v-data-table>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

