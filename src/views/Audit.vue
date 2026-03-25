<script setup>
//TODO paginacion y filtrado
//TODO Audit de Artifacts y Modules
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { AuditEvents, AuditEventHeaders } from '@/_mockApis/dataTable';
import axiosServices from '@/utils/axios';
import { formatDate } from '@/utils/helpers/dateFormat';

const route = useRoute();

const loading = ref(true);
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
const auditHeaders = ref([
    {
        title: 'Actions',
        align: 'start',
        key: 'actions'
    },
    {
        title: 'date',
        align: 'start',
        key: 'created_at'
    }
]);
const audits = ref([]);
/* const AuditEventHeaders = [
    { title: 'Actor User ID', align: 'start', key: 'actor_user_id' },
    { title: 'Entity Type', align: 'start', key: 'entity_type' },
    { title: 'Entity ID', align: 'start', key: 'entity_id' },
    { title: 'Action', align: 'start', key: 'action' },
    {title: 'Json', align: 'center', key: 'content_json'},
    { title: 'Created At', align: 'start', key: 'created_at' },
] */

const search = ref();

onMounted(async () => {
    const auditData = await getAudit();
    console.log('Audit Events fetched:', auditData);
    audits.value = auditData;
    loading.value = false;
});

const getAudit = async () => {
    const response = await axiosServices
        .get('/audit-trails')
        .then((res) => {
            console.log('Raw audit events:', res.data);
            res.data = res.data.map((item) => {
                return {
                    ...item,
                    after_json: item.after_json ? JSON.parse(item.after_json) : null,
                    before_json: item.before_json ? JSON.parse(item.before_json) : null,
                    created_at: item.created_at ? formatDate(item.created_at) : ''
                };
            });
            console.log('Parsed audit events:', res.data);
            return res.data;
        })
        .catch((error) => {
            console.error('Error fetching audit events:', error);
        });
    return response;
};
const openDialog = (before_status, after_status) => {
    jsonDialog.value = true;
    selectedJson.value = {
        before_status,
        after_status
    };
};
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Audits">
                <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>
                <v-text-field v-if="!loading" v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line hide-details class="mb-5" />
                <v-data-table v-if="!loading" :headers="auditHeaders" :items="audits" class="elevation-1" :search="search" items-per-page="5">
                    <!-- <template v-slot:item.content_json="{ item }">
                        <v-tooltip text="Inspect JSONs">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon size="30" color="primary" @click="openDialog(item.before_json.status, item.after_json.status)">
                                    <v-icon style="font-size: 15px">mdi-magnify</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template> -->
                    <template v-slot:item.actions="{ item }">
                        <span v-if="item.action != 'deleted'" class="mx-2"
                            >The user <strong>{{ item.actor.name }}</strong> with role <strong>{{ item.actor.roles[0].name }}</strong> has
                            performed an <strong>{{ item.action }}</strong> on <strong>{{ item.entity_type }}</strong>{{ " " }} 
                            <strong>{{ item.entity && item.entity.name ? item.entity.name : 'N/A' }}</strong
                            >.</span
                        >
                        <span v-else class="mx-2"
                            >The user <strong>{{ item.actor.name }}</strong> with role <strong>{{ item.actor.roles[0].name }}</strong> has
                            performed an <strong>{{ item.action }}</strong> on <strong>{{ item.entity_type }}</strong>{{ " " }}
                            <strong>{{ item.before_json && item.before_json.name ? item.before_json.name : 'N/A' }}</strong
                            >.</span
                        >
                        <!-- <v-tooltip
                            :text="
                                item.before_json && item.after_json
                                    ? 'Before: ' + item.before_json.status + ', After: ' + item.after_json.status
                                    : 'No JSON data available'
                            "
                        >
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" size="20">mdi-alert-circle-outline</v-icon>
                            </template>
                        </v-tooltip> -->
                    </template>
                </v-data-table>

                <v-dialog v-model="jsonDialog" max-width="600">
                    <v-card>
                        <v-card-title>Content JSON</v-card-title>
                        <v-card-text>
                            <p>
                                Before Status: <strong>{{ selectedJson.before_status }} </strong>
                            </p>
                            <p>
                                After Status: <strong>{{ selectedJson.after_status }}</strong>
                            </p>
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
