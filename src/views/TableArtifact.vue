<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ArtifactHeaders, ArtifactItems } from '@/_mockApis/dataTable';
import { statusArtifact, typeArtifact } from '@/enum/enum.js'

const page = ref({ title: 'List Artifact' });
const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '/'
    },
    {
        text: 'List Artifacts',
        disabled: true,
        href: '#'
    }
]);

const search = ref();
const dialog = ref(false);
const selectedJson = ref({});

const editDialog = ref(false);
const selectedArtifact = ref({});

// Funciones
function openEditDialog(item) {
  selectedArtifact.value = { ...item };
  editDialog.value = true;
}

function saveEdit() {
  if (!selectedArtifact.value) return;
  const index = artifact.value.findIndex(p => p.id === selectedArtifact.value.id);
  if (index !== -1) {
    artifact.value[index] = { ...selectedArtifact.value };
  }
  editDialog.value = false;
}

function deleteArtifact(item) {
  artifact.value = artifact.value.filter(p => p.id !== item.id);
}

const openDialog = (content_json) => {
    dialog.value = true
    selectedJson.value = content_json
}



</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Artifacts">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line hide-details
                    class="mb-5" />
                <v-data-table
                items-per-page="5"
                :headers="ArtifactHeaders"
                :items="ArtifactItems"
                :search="search"
                class="border rounded-md"
                >
                <template v-slot:item.completed_at="{ item }">
                    {{ item.completed_at ? item.completed_at : item.status }}
                </template>
                <template v-slot:item.content_json="{ item }">
                    <v-btn size="small" @click="openDialog(item.content_json)">
                    JSON
                    </v-btn>
                </template>
                <!-- Columna de acciones -->
                <template v-slot:item.actions="{ item }">
                    <v-btn icon size="30" color="success"class="mr-1" @click="openEditDialog(item)">
                    <v-icon style="font-size: 15px;">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon size="30" color="error" @click="deleteArtifact(item)">
                    <v-icon style="font-size: 15px;">mdi-delete</v-icon>
                    </v-btn>
                </template>
                
                </v-data-table>
                <!-- Dialog para editar -->
                <v-dialog v-model="editDialog" max-width="600">
                <v-card>
                    <v-card-title>Edit Artifact</v-card-title>
                    <v-card-text>
                    <v-text-field label="Project ID" v-model="selectedArtifact.project_id" />
                    <v-select 
                        label="Type" 
                        :items="typeArtifact" 
                        v-model="selectedArtifact.type" 
                    />
                    <v-select
                        label="Status"
                        :items="statusArtifact"
                        v-model="selectedArtifact.status"
                    />
                    <v-text-field label="Owner" v-model="selectedArtifact.owner" />
                    <v-text-field label="Completed at" v-model="selectedArtifact.completed_at" />
                    </v-card-text>
                    <v-card-actions>
                    <v-btn @click="dialog = true">Json</v-btn>
                    <v-btn @click="editDialog = false">Cancel</v-btn>
                    <v-btn color="success" @click="saveEdit()">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>

                <!-- Dialog para mostrar el JSON -->
                <v-dialog v-model="dialog" max-width="600">
            <v-card>
            <v-card-title>Content JSON - {{ type }}</v-card-title>
            <v-card-text>
                <!-- Render dinámico según el type -->
                <template v-if="type === 'Strategic alignment'">
                <v-text-field label="Transformation" v-model="content_json.transformation" />
                <v-combobox label="Supported Decisions" v-model="content_json.supported_decisions" multiple />
                <!-- Ejemplo de array de objetos -->
                <div v-for="(m, i) in content_json.measurable_success" :key="i">
                    <v-text-field label="Metric" v-model="m.metric" />
                    <v-text-field label="Target" v-model="m.target" />
                </div>
                <v-combobox label="Out of Scope" v-model="content_json.out_of_scope" multiple />
                </template>

                <template v-else-if="type === 'Big picture'">
                <v-text-field label="Ecosystem Vision" v-model="content_json.ecosystem_vision" />
                <v-combobox label="Impacted Domains" v-model="content_json.impacted_domains" multiple />
                <v-text-field label="Success Definition" v-model="content_json.success_definition" />
                </template>

                <template v-else-if="type === 'Domain breakdown'">
                <div v-for="(d, i) in content_json.domains" :key="i">
                    <v-text-field label="Name" v-model="d.name" />
                    <v-text-field label="Objective" v-model="d.objective" />
                    <v-text-field label="Owner User ID" v-model="d.owner_user_id" />
                </div>
                </template>

                <template v-else-if="type === 'System Architecture'">
                <v-text-field label="Auth Model" v-model="content_json.auth_model" />
                <v-text-field label="API Style" v-model="content_json.api_style" />
                <v-textarea label="Data Model Notes" v-model="content_json.data_model_notes" />
                <v-textarea label="Scalability Notes" v-model="content_json.scalability_notes" />
                </template>

                <template v-else-if="type === 'Phase Scope'">
                <v-combobox label="Included Modules" v-model="content_json.included_modules" multiple />
                <v-combobox label="Excluded Items" v-model="content_json.excluded_items" multiple />
                <v-combobox label="Acceptance Criteria" v-model="content_json.acceptance_criteria" multiple />
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialog = false">Close</v-btn>
                <v-btn color="success" @click="saveContentJson()">Save</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

            </UiParentCard>
        </v-col>
    </v-row>
</template>

