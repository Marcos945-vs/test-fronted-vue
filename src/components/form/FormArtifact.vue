<script setup>
//TODO Quita los combobox y ponlos como Measurable Success
import { ref } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
import { statusArtifact, typeArtifact } from '@/enum/enum.js';
import { useSelectedStore } from '@/stores/selectedItems';
import { useAuthStore } from '@/stores/auth';
import axiosServices from '@/utils/axios';

const router = useRouter();
const selectedStore = useSelectedStore();
const authStore = useAuthStore();

const project_name = ref(selectedStore.project.name || '');
const type = ref(selectedStore.artifact);
const status = ref('');
const owner_user_id = ref('');
const completed_at = ref('');
const content_json = ref({});

const error_message = ref('');
const snackbar = ref(false);
const formRef = ref(null);

const requiredRule = [(v) => !!v || 'Este campo es obligatorio'];

const initContentJson = (typeName) => {
    switch (typeName) {
        case 'Strategic Alignment':
            return {
                transformation: '',
                supported_decisions: [''],
                measurable_success: [{ metric: '', target: '' }],
                out_of_scope: ['']
            };
        case 'Big Picture':
            return {
                ecosystem_vision: '',
                impacted_domains: [{ name: '', description: '' }],
                success_definition: ''
            };
        case 'Domain Breakdown':
            return {
                domains: [{ name: '', objective: '', owner_user_id: '' }]
            };
        case 'Module Matrix':
            return {
                modules_overview: [{ name: '', domain: '', priority: '', phase: '' }]
            };
        case 'Module Engineering':
            return {
                modules_overview: [{ name: '', domain: '', priority: '', phase: '' }]
            };
        case 'System Architecture':
            return {
                auth_model: '',
                api_style: '',
                data_model_notes: '',
                scalability_notes: ''
            };
        case 'Phase Scope':
            return {
                included_modules: [],
                excluded_items: [],
                acceptance_criteria: []
            };
        default:
            return {};
    }
};

content_json.value = initContentJson(type.value.title);

const handleSubmit = async () => {
    const { valid } = await formRef.value.validate();
    if (!valid) return;
    switch (type.value.title) {
        case 'Strategic Alignment':
            await createArtifact();
            break;
        case 'Big Picture':
            const domains = await createDomains();
            content_json.value.impacted_domains = domains.map((d) => Number(d.id)).filter((id) => !Number.isNaN(id));
            console.log('Contenido JSON actualizado con IDs de domains:', content_json.value);
            await createArtifact();
            break;
        case 'Domain Breakdown':
            await createArtifact();
            break;
        case 'Module Matrix':
            await createArtifact();
            break;
        case 'Module Engineering':
            await createArtifact();
            break;
        case 'System Architecture':
            await createArtifact();
            break;
        case 'Phase Scope':
            await createArtifact();
            break;
        default:
            console.error('Tipo de artifact desconocido:', type.value.title);
    }
    router.back();
};
const createArtifact = async () => {
    const response = await axiosServices
        .post('/artifacts', {
            project_id: selectedStore.project.id,
            type: type.value.url,
            owner_user_id: authStore.user.id,
            content_json: content_json.value
        })
        .catch((error) => {
            error_message.value = error.response?.data?.message;
            console.log('Error al crear artifact:', error.value);
            snackbar.value = true;
            return;
        });
    console.log('Artifact creado:', response.data);
};
const createDomains = async () => {
    console.log('Contenido JSON para domains:', content_json.value.impacted_domains);
    const domains = await axiosServices
        .post('/domains/massive', {
            project_id: selectedStore.project.id,
            domains: content_json.value.impacted_domains
        })
        .catch((error) => {
            console.log('Error al crear domains:', error);
            return;
        });
    console.log('Domains creados:', domains);
    return domains.data;
};
</script>

<template>
    <v-form ref="formRef">
        <v-row>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-2">Proyect</v-label>
                <VTextField type="text" disabled hide-details v-model="project_name" :rules="[requiredRule]"></VTextField>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-2">Type</v-label>
                <v-select disabled :items="typeArtifact" v-model="type" label="Select Type" hide-details :rules="[requiredRule]" />
            </v-col>
            <!-- <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Status</v-label>
            <v-select :items="statusArtifact" v-model="status" label="Select Status" hide-details :rules="[requiredRule]" />
        </v-col> -->
            <!-- <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Owner User ID</v-label>
            <VTextField type="text" placeholder="U-001" hide-details v-model="owner_user_id" :rules="[idRule]"></VTextField>
        </v-col> -->
            <!-- <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Complete at</v-label>
            <VTextField type="text" placeholder="2026-03-03" hide-details v-model="completed_at" :rules="[dateRule]"></VTextField>
        </v-col> -->
        </v-row>

        <v-card class="mt-4">
            <v-card-title>{{ type.title }} Details</v-card-title>
            <v-card-text>
                <template v-if="type.title === 'Strategic Alignment'">
                    <v-text-field :rules="requiredRule" label="Transformation" v-model="content_json.transformation" />
                    <!-- <v-combobox label="Supported Decisions" v-model="content_json.supported_decisions" multiple /> -->
                    <div v-for="(s, i) in content_json.supported_decisions" :key="i" class="d-flex ga-2 align-center mb-2">
                        <v-text-field
                            :rules="requiredRule"
                            :label="`Supported Decision No: ${i + 1}`"
                            v-model="content_json.supported_decisions[i]"
                        />
                        <v-btn
                            class="d-flex align-center"
                            icon="mdi-plus"
                            color="primary"
                            variant="text"
                            size="small"
                            @click="content_json.supported_decisions.push('')"
                            :style="{ visibility: i === content_json.supported_decisions.length - 1 ? 'visible' : 'hidden' }"
                        ></v-btn>
                        <v-btn
                            icon="mdi-delete"
                            color="error"
                            variant="text"
                            size="small"
                            @click="content_json.supported_decisions.splice(i, 1)"
                            :disabled="content_json.supported_decisions.length <= 1"
                        />
                    </div>
                    <!-- <v-combobox label="Out of Scope" v-model="content_json.out_of_scope" multiple /> -->
                    <div v-for="(o, i) in content_json.out_of_scope" :key="i" class="d-flex ga-2 align-center mb-2">
                        <v-text-field :rules="requiredRule" :label="`Out Of Scope No: ${i + 1}`" v-model="content_json.out_of_scope[i]" />
                        <v-btn
                            class="d-flex align-center"
                            icon="mdi-plus"
                            color="primary"
                            variant="text"
                            size="small"
                            @click="content_json.out_of_scope.push('')"
                            :style="{ visibility: i === content_json.out_of_scope.length - 1 ? 'visible' : 'hidden' }"
                        ></v-btn>
                        <v-btn
                            icon="mdi-delete"
                            color="error"
                            variant="text"
                            size="small"
                            @click="content_json.out_of_scope.splice(i, 1)"
                            :disabled="content_json.out_of_scope.length <= 1"
                        />
                    </div>
                    <v-label class="font-weight-medium mb-2">Measurable Success</v-label>
                    <div v-for="(m, i) in content_json.measurable_success" :key="i" class="d-flex ga-2 align-center mb-2">
                        <v-text-field :rules="requiredRule" label="Metric" v-model="m.metric" />
                        <v-text-field :rules="requiredRule" label="Target" v-model="m.target" />
                        <v-btn
                            class="d-flex align-center"
                            icon="mdi-plus"
                            color="primary"
                            variant="text"
                            size="small"
                            @click="content_json.measurable_success.push({ metric: '', target: '' })"
                            :style="{ visibility: i === content_json.measurable_success.length - 1 ? 'visible' : 'hidden' }"
                        ></v-btn>
                        <v-btn
                            icon="mdi-delete"
                            color="error"
                            variant="text"
                            size="small"
                            @click="content_json.measurable_success.splice(i, 1)"
                            :disabled="content_json.measurable_success.length <= 1"
                        />
                    </div>
                </template>

                <template v-else-if="type.title === 'Big Picture'">
                    <v-text-field label="Ecosystem Vision" v-model="content_json.ecosystem_vision" />
                    <v-text-field label="Success Definition" v-model="content_json.success_definition" />
                    <!--<v-combobox label="Impacted Domains" v-model="content_json.impacted_domains" multiple />-->
                    <v-label class="font-weight-medium mb-2">Impacted Domains</v-label>
                    <div v-for="(d, i) in content_json.impacted_domains" :key="i" class="d-flex ga-2 align-center mb-2">
                        <v-text-field :rules="requiredRule" label="Domain Name" v-model="d.name" />
                        <v-text-field :rules="requiredRule" label="Domain Description" v-model="d.description" />
                        <v-btn
                            class="d-flex align-center"
                            icon="mdi-plus"
                            color="primary"
                            variant="text"
                            size="small"
                            @click="content_json.impacted_domains.push({ name: '', description: '' })"
                            :style="{ visibility: i === content_json.impacted_domains.length - 1 ? 'visible' : 'hidden' }"
                        ></v-btn>
                        <v-btn
                            icon="mdi-delete"
                            color="error"
                            variant="text"
                            size="small"
                            @click="content_json.impacted_domains.splice(i, 1)"
                            :disabled="content_json.impacted_domains.length <= 1"
                        />
                    </div>
                </template>

                <template v-else-if="type.title === 'Domain Breakdown'">
                    <div v-for="(d, i) in content_json.domains" :key="i">
                        <v-text-field label="Name" v-model="d.name" />
                        <v-text-field label="Objective" v-model="d.objective" />
                        <v-text-field label="Owner User ID" v-model="d.owner_user_id" />
                    </div>
                </template>

                <template v-else-if="type.title === 'Module Matrix'">
                    <v-combobox label="Module Names" v-model="content_json.modules_overview_names" multiple />
                    <v-combobox label="Domains" v-model="content_json.modules_overview_domains" multiple />
                    <v-combobox label="Priorities" v-model="content_json.modules_overview_priorities" multiple />
                    <v-combobox label="Phases" v-model="content_json.modules_overview_phases" multiple />
                </template>

                <template v-else-if="type.title === 'Module Engineering'">
                    <v-combobox label="Module Names" v-model="content_json.modules_overview_names" multiple />
                    <v-combobox label="Domains" v-model="content_json.modules_overview_domains" multiple />
                    <v-combobox label="Priorities" v-model="content_json.modules_overview_priorities" multiple />
                    <v-combobox label="Phases" v-model="content_json.modules_overview_phases" multiple />
                </template>

                <template v-else-if="type.title === 'System Architecture'">
                    <v-text-field label="Auth Model" v-model="content_json.auth_model" />
                    <v-text-field label="API Style" v-model="content_json.api_style" />
                    <v-textarea label="Data Model Notes" v-model="content_json.data_model_notes" />
                    <v-textarea label="Scalability Notes" v-model="content_json.scalability_notes" />
                </template>

                <template v-else-if="type.title === 'Phase Scope'">
                    <v-combobox label="Included Modules" v-model="content_json.included_modules" multiple />
                    <v-combobox label="Excluded Items" v-model="content_json.excluded_items" multiple />
                    <v-combobox label="Acceptance Criteria" v-model="content_json.acceptance_criteria" multiple />
                </template>
            </v-card-text>
        </v-card>
        <v-row class="mt-4">
            <v-col cols="6" class="align-start">
                <v-btn variant="outlined" @click="router.back()" color="primary" flat>Cancel</v-btn>
            </v-col>
            <!-- <v-col cols="4" class="d-flex justify-center">
            <v-btn variant="outlined" color="primary" @click="openDialog()"> Add Content JSON </v-btn>
        </v-col> -->
            <v-col cols="6" class="d-flex justify-end">
                <v-btn variant="outlined" @click="handleSubmit" color="primary" flat>Create Artifact</v-btn>
            </v-col>
        </v-row>

        <!-- <v-row>
        <p class="ma-2">{{ error }}</p>
    </v-row> -->
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="3000">
        {{ error_message }}

        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
    </v-snackbar>
</template>
