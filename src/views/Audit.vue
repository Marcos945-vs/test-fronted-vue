<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { AuditEvents, AuditEventHeaders } from '@/_mockApis/dataTable';

const route = useRoute()

const page = ref({ title: 'Audit Events' });
const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '/'
    },
    {
        text: 'Audit Events',
        disabled: true,
        href: '#'
    }
]);

const jsonDialog = ref(false);
const selectedJson = ref({});

const search = ref();


const openDialog = (before_status, after_status) => {
    jsonDialog.value = true
    selectedJson.value = {
        before_status,
        after_status
    }
}


</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Audits">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line hide-details
                    class="mb-5" />
                    <v-data-table
                        :headers="AuditEventHeaders"
                        :items="AuditEvents"
                        class="elevation-1"
                        :search="search"
                        items-per-page="5"
                    >
                        <template v-slot:item.content_json="{ item }">
                            <v-btn icon size="30" color="primary" @click="openDialog(item.before_json.status, item.after_json.status)">
                                <v-icon style="font-size: 15px;">mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>

                    <v-dialog v-model="jsonDialog" max-width="600">
                    <v-card>
                        <v-card-title>Content JSON</v-card-title>
                        <v-card-text>
                            <p>Before Status: <strong>{{ selectedJson.before_status }} </strong></p>
                            <p>After Status: <strong>{{ selectedJson.after_status }}</strong></p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="jsonDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-card-actions>
                        <v-btn @click="$router.back()">Back</v-btn>
                    </v-card-actions>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
