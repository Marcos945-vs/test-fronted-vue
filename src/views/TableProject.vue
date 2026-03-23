<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Projects">
                <v-row class="justify-space-between">
                    <v-col cols="8">
                        <v-text-field
                            v-model="search"
                            append-inner-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            class="mb-5"
                        />
                    </v-col>
                    <v-col class="d-flex justify-end">
                        <v-btn to="/FormProject"> New Project </v-btn>
                    </v-col>
                </v-row>
                <v-data-table items-per-page="5" :headers="ProjectHeaders" :items="projects" :search="search" class="border rounded-md">
                    <!-- Columna de acciones -->
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip text="Edit Project">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon size="30" color="success" class="mr-1" @click="openEditDialog(item)">
                                    <v-icon style="font-size: 15px">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip text="Delete Project">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon size="30" color="error" class="mr-1" @click="deleteProject(item)">
                                    <v-icon style="font-size: 15px">mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip text="View Project Details">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon size="30" color="primary" @click="goToDetail(item)">
                                    <v-icon style="font-size: 15px">mdi-magnify</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template>
                </v-data-table>

                <!-- Dialog para editar -->
                <v-dialog v-model="editDialog" max-width="600">
                    <v-card>
                        <v-card-title>Edit Project</v-card-title>
                        <v-card-text>
                            <v-text-field label="Name" v-model="selectedProject.name" />
                            <v-text-field label="Client Name" v-model="selectedProject.client" />
                            <v-text-field label="Created by" v-model="selectedProject.created" />
                            <v-select
                                label="Status"
                                :items="['Draft', 'Discovery', 'Execution', 'Delivered']"
                                v-model="selectedProject.status"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="editDialog = false">Cancel</v-btn>
                            <v-btn color="success" @click="saveEdit()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ProjectItems, ProjectHeaders } from '@/_mockApis/dataTable';
import { useRouter } from 'vue-router';
import { useSelectedStore } from '@/stores/selectedItems';
import { useAuditEventsStore } from '@/stores/auditEvents';
import axiosServices from '@/utils/axios';

const auditStore = useAuditEventsStore();
const selectedStore = useSelectedStore();
const router = useRouter();

const page = ref({ title: 'List Project' });
const breadcrumbs = ref([
    { text: 'Home', disabled: false, href: '/' },
    { text: 'List Projects', disabled: true, href: '#' }
]);

const search = ref('');
const projects = ref([...ProjectItems]);

const editDialog = ref(false);
const selectedProject = ref({});

onMounted(() => {
    getProjects();
    //auditStore.fetchAuditEvents();
});
// Funciones
async function getProjects() {
    const response = await axiosServices.get('/projects');
    /* projects.value = response.data; */
    console.log('Projects fetched:', response.data);
}

function openEditDialog(item) {
    selectedProject.value = { ...item };
    editDialog.value = true;
}

function saveEdit() {
    if (!selectedProject.value) return;
    const index = projects.value.findIndex((p) => p.name === selectedProject.value.name);
    if (index !== -1) {
        projects.value[index] = { ...selectedProject.value };
    }
    editDialog.value = false;
}

function deleteProject(item) {
    projects.value = projects.value.filter((p) => p.name !== item.name);
}

const goToDetail = (item) => {
    selectedStore.selectProject(item);
    router.push(`/DetailsProject/${item.name}`);
};
</script>
