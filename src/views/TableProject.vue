<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Projects">
                <v-row v-if="!loading" class="justify-space-between">
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
                        <v-btn v-if="authStore.user.user.roles[0].name == 'admin'" to="/FormProject"> New Project </v-btn>
                    </v-col>
                </v-row>
                <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>
                <v-data-table
                    v-else
                    :loading="updatingTable"
                    items-per-page="5"
                    :headers="ProjectHeaders"
                    :items="projects"
                    :search="search"
                    class="border rounded-md"
                >
                    <template v-slot:item.name="{ item }">
                        <span class="mx-2">{{ item.name }}</span>
                        <v-tooltip :text="item.description ? item.description : 'No description available'">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" size="20">mdi-alert-circle-outline</v-icon>
                            </template>
                        </v-tooltip>
                    </template>
                    <!-- Columna de acciones -->
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip text="Edit Project">
                            <!-- v-if="authStore.user.user.roles[0].name == 'admin' || authStore.user.user.abilities.includes('edit_projects')" -->
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon size="30" color="success" class="mr-1" @click="openEditDialog(item)">
                                    <v-icon style="font-size: 15px">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>

                        <v-tooltip v-if="authStore.user.user.roles[0].name == 'admin'" text="Delete Project">
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
                            <v-text-field label="Client Name" v-model="selectedProject.client_name" />
                            <!-- <v-text-field label="Created by" v-model="selectedProject.created" /> -->
                            <v-select
                                label="Status"
                                :items="[
                                    { title: 'Draft', value: 'draft' },
                                    { title: 'Discovery', value: 'discovery' },
                                    { title: 'Execution', value: 'execution' },
                                    { title: 'Delivered', value: 'delivered' }
                                ]"
                                v-model="selectedProject.status"
                            />
                            <p v-if="updateErrors" class="text-error">{{ updateErrors.message }}</p>
                            <v-textarea
                                label="Project Description"
                                placeholder="Project Description"
                                row-height="25"
                                rows="3"
                                variant="outlined"
                                auto-grow
                                v-model="selectedProject.description"
                            ></v-textarea>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="closeDialog()">Cancel</v-btn>
                            <v-btn color="success" @click="saveEdit()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script setup>
//TODO paginacion
//TODO Falta filtrado
import { onMounted, ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRouter } from 'vue-router';
import { useSelectedStore } from '@/stores/selectedItems';
import { useAuditEventsStore } from '@/stores/auditEvents';
import { useAuthStore } from '@/stores/auth';
import axiosServices from '@/utils/axios';

const authStore = useAuthStore();

const selectedStore = useSelectedStore();
const router = useRouter();
const loading = ref(true);
const updatingTable = ref(false);
const updateErrors = ref(null);
const ProjectHeaders = [
    { title: 'Name', align: 'start', key: 'name' },
    { title: 'Client Name', align: 'start', key: 'client_name' },
    { title: 'Created by', align: 'start', key: 'created_by.name' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'Actions', align: 'center', key: 'actions' }
];

const page = ref({ title: 'List Project' });
const breadcrumbs = ref([
    { text: 'Home', disabled: false, href: '/' },
    { text: 'List Projects', disabled: true, href: '#' }
]);

const search = ref('');
/* const projects = ref([...ProjectItems]); */
const projects = ref([]);

const editDialog = ref(false);
const selectedProject = ref({});

onMounted(async () => {
    console.log('User', authStore.user.user);
    projects.value = await getProjects();
    loading.value = false;
});
// Funciones
async function getProjects() {
    const response = await axiosServices.get('/projects');
    /* console.log('Projects fetched:', response.data); */
    /* projects.value = response.data; */
    return response.data;
}

function openEditDialog(item) {
    selectedProject.value = { ...item };
    console.log('Selected project for editing:', selectedProject.value);
    editDialog.value = true;
}
function closeDialog() {
    editDialog.value = false;
    selectedProject.value = {};
    updateErrors.value = null;
}
async function saveEdit() {
    updateErrors.value = null;
    updatingTable.value = true;
    if (!selectedProject.value) return;
    const response = await axiosServices
        .put(`/projects/${selectedProject.value.id}`, {
            name: selectedProject.value.name,
            client_name: selectedProject.value.client_name,
            status: selectedProject.value.status,
            is_archived: selectedProject.value.is_archived,
            description: selectedProject.value.description ? selectedProject.value.description : null
        })
        .then(async (response) => {
            closeDialog();
            projects.value = await getProjects();
            updatingTable.value = false;
        })
        .catch((error) => {
            console.error('Error updating project:', error);
            updateErrors.value = error.response.data;
            updatingTable.value = false;
        });
}

function deleteProject(item) {
    updatingTable.value = true;
    axiosServices
        .delete(`/projects/${item.id}`)
        .then(async (response) => {
            projects.value = await getProjects();
            updatingTable.value = false;
        })
        .catch((error) => {
            console.error('Error deleting project:', error);
            updatingTable.value = false;
        });
}

const goToDetail = (item) => {
    selectedStore.selectProject(item);
};
</script>
