<script setup lang="ts">
//TODO Roles y permisos para crear artefactos
//TODO Falta el update y delete
//TODO Cambiar nombre del componente que renderiza el tree
import { ArtifactItems } from '@/_mockApis/dataTable';
import { computed, ref } from 'vue';
import { useSelectedStore } from '@/stores/selectedItems';
import { typeArtifact, statusArtifact } from '@/enum/enum';
import axiosServices from '@/utils/axios';
import StrategicAligment from './artifactsContents/strategicAligment.vue';

const selectedStore = useSelectedStore();

const artifacts = ref(selectedStore.artifact.content);

const dialog = ref(false);

const dialogJson = ref(false);
const selectedArtifact = ref(selectedStore.artifact.content);

function openDialogJson(item: any) {
    selectedArtifact.value = { ...item };
    dialogJson.value = true;
}

const openDialog = (item: any) => {
    selectedArtifact.value = { ...item };
    dialog.value = true;
};

function saveJson() {
    if (!selectedArtifact.value) return;
    const index = artifacts.value.findIndex((p) => p.project_id === selectedArtifact.value.project_id);
    if (index !== -1) {
        artifacts.value[index] = { ...selectedArtifact.value };
    }
    dialogJson.value = false;
}

function save() {
    if (!selectedArtifact.value) return;
    const index = artifacts.value.findIndex((p) => p.project_id === selectedArtifact.value.project_id);
    if (index !== -1) {
        artifacts.value[index] = { ...selectedArtifact.value };
    }
    dialog.value = false;
}
</script>

<template>
    <h2 class="text-h6 mb-4">{{ selectedStore.artifact.title }}</h2>

    <v-row class="mb-2">
        <v-col cols="12" class="pb-0">
            <!-- Cabecera del proyecto -->
            <!-- <v-card-title class="d-flex justify-start align-center">
                    <span class="text-h6 font-weight-bold mr-2">Project ID: {{ item.project_id }}</span>
                    <v-chip :color="item.status === 'completed' ? 'green' : 'blue'" text-color="white" size="small">
                        {{ item.status }}
                    </v-chip>
                </v-card-title> -->
            <v-card-subtitle class="mb-1">
                Owner: <strong>{{ selectedStore.artifact.content.owner.name }}</strong>
                <span v-if="selectedStore.artifact.content.completed_at" class="ml-4">
                    Completed at: {{ selectedStore.artifact.content.completed_at }}
                </span>
            </v-card-subtitle>

            <!-- Contenido dinámico -->
            <v-card-text class="pt-2 pb-0">
                <div>
                    <StrategicAligment></StrategicAligment>
                </div>

                <!-- <div v-else-if="item.type === 'Big picture'">
                        <p><strong>Ecosystem vision:</strong> {{ item.content_json.ecosystem_vision }}</p>
                        <p v-if="Array.isArray(item.content_json.impacted_domains)">
                            <strong>Impacted domains:</strong>
                            <v-chip-group>
                                <v-chip
                                    v-for="d in item.content_json.impacted_domains"
                                    :key="d"
                                    color="secondary"
                                    text-color="white"
                                    size="small"
                                    class="ma-1"
                                >
                                    {{ d }}
                                </v-chip>
                            </v-chip-group>
                        </p>
                        <p><strong>Success definition:</strong> {{ item.content_json.success_definition }}</p>
                    </div>

                    <div v-else-if="item.type === 'Domain breakdown'">
                        <p><strong>Domains:</strong></p>
                        <v-list density="compact">
                            <v-list-item v-for="d in item.content_json.domains" :key="d.name">
                                <v-list-item-title> {{ d.name }} → {{ d.objective }} (Owner: {{ d.owner_user_id }}) </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </div>

                    <div v-else-if="item.type === 'Module Matrix' || item.type === 'Module Engineering'">
                        <p><strong>Modules overview:</strong></p>
                        <v-list density="compact">
                            <v-list-item v-for="mod in item.content_json.modules_overview" :key="mod.name">
                                <v-list-item-title>
                                    {{ mod.name }} → Domain: {{ mod.domain }}, Priority: {{ mod.priority }}, Phase: {{ mod.phase }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </div>

                    <div v-else-if="item.type === 'System Architecture'">
                        <p><strong>Auth model:</strong> {{ item.content_json.auth_model }}</p>
                        <p><strong>API style:</strong> {{ item.content_json.api_style }}</p>
                        <p><strong>Data model notes:</strong> {{ item.content_json.data_model_notes }}</p>
                        <p><strong>Scalability notes:</strong> {{ item.content_json.scalability_notes }}</p>
                    </div>

                    <div v-else-if="item.type === 'Phase Scope'">
                        <p v-if="Array.isArray(item.content_json.included_modules)">
                            <strong>Included modules:</strong> {{ item.content_json.included_modules.join(', ') }}
                        </p>
                        <p v-if="Array.isArray(item.content_json.excluded_items)">
                            <strong>Excluded items:</strong> {{ item.content_json.excluded_items.join(', ') }}
                        </p>
                        <p v-if="Array.isArray(item.content_json.acceptance_criteria)">
                            <strong>Acceptance criteria:</strong> {{ item.content_json.acceptance_criteria.join(', ') }}
                        </p>
                    </div> -->
            </v-card-text>
            <v-card-actions class="f-flex justify-end py-2">
                <v-btn @click="$router.push('/TableProject')">Back</v-btn>
                <v-btn @click="openDialog(item)">Update</v-btn>
                <v-btn @click="openDialog(item)">Delete</v-btn>
            </v-card-actions>

            <!-- Dialog para upgradear el artifact -->
            <v-dialog v-model="dialog" max-width="600">
                <v-card>
                    <v-card-title>{{ item.type }}</v-card-title>
                    <v-card-text>
                        <!-- Elementos fijos del artifact -->
                        <v-col cols="12">
                            <VTextField
                                type="text"
                                label="Project ID"
                                placeholder="123456"
                                hide-details
                                v-model="item.project_id"
                            ></VTextField>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="typeArtifact" v-model="item.type" label="Select Type" hide-details />
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="statusArtifact" v-model="item.status" label="Select Status" hide-details />
                        </v-col>
                        <v-col cols="12">
                            <VTextField
                                type="text"
                                label="Owner User ID"
                                placeholder="U-001"
                                hide-details
                                v-model="item.owner_user_id"
                            ></VTextField>
                        </v-col>
                        <v-col cols="12">
                            <VTextField
                                type="text"
                                label="Completed at"
                                placeholder="2026-03-03"
                                hide-details
                                v-model="item.completed_at"
                            ></VTextField>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="openDialogJson(item)">Json</v-btn>
                        <v-btn @click="save()">Save</v-btn>
                        <v-btn @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
                <!-- Render dinámico según el type -->
                <v-dialog v-model="dialogJson" max-width="600">
                    <v-card>
                        <v-card-title>{{ item.type }}</v-card-title>
                        <v-card-text>
                            <template v-if="item.type === 'Strategic alignment'">
                                <v-text-field label="Transformation" v-model="item.content_json.transformation" />
                                <v-combobox label="Supported Decisions" v-model="item.content_json.supported_decisions" multiple />
                                <!-- Ejemplo de array de objetos -->
                                <div v-for="(m, i) in item.content_json.measurable_success" :key="i">
                                    <v-text-field label="Metric" v-model="m.metric" />
                                    <v-text-field label="Target" v-model="m.target" />
                                </div>
                                <v-combobox label="Out of Scope" v-model="item.content_json.out_of_scope" multiple />
                            </template>

                            <template v-else-if="item.type === 'Big picture'">
                                <v-text-field label="Ecosystem Vision" v-model="item.content_json.ecosystem_vision" />
                                <v-combobox label="Impacted Domains" v-model="item.content_json.impacted_domains" multiple chips />
                                <v-text-field label="Success Definition" v-model="item.content_json.success_definition" />
                            </template>

                            <template v-else-if="item.type === 'Domain breakdown'">
                                <div v-for="(d, i) in item.content_json.domains" :key="i">
                                    <v-text-field label="Name" v-model="d.name" />
                                    <v-text-field label="Objective" v-model="d.objective" />
                                    <v-text-field label="Owner User ID" v-model="d.owner_user_id" />
                                </div>
                            </template>

                            <template v-else-if="item.type === 'System Architecture'">
                                <v-text-field label="Auth Model" v-model="item.content_json.auth_model" />
                                <v-text-field label="API Style" v-model="item.content_json.api_style" />
                                <v-textarea label="Data Model Notes" v-model="item.content_json.data_model_notes" />
                                <v-textarea label="Scalability Notes" v-model="item.content_json.scalability_notes" />
                            </template>

                            <template v-else-if="item.type === 'Phase Scope'">
                                <v-combobox label="Included Modules" v-model="item.content_json.included_modules" multiple />
                                <v-combobox label="Excluded Items" v-model="item.content_json.excluded_items" multiple />
                                <v-combobox label="Acceptance Criteria" v-model="item.content_json.acceptance_criteria" multiple />
                            </template>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="dialogJson = false">Close</v-btn>
                            <v-btn color="success" @click="saveJson()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<style scoped>
h2 {
    font-weight: bold;
    color: #3f51b5;
}
</style>
