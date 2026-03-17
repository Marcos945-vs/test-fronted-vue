<script setup >
import { ref } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router' 
import { statusArtifact, typeArtifact } from '@/enum/enum.js'

const router = useRouter()

const project_id = ref('')
const type = ref('')
const status = ref('')
const owner_user_id = ref('')
const completed_at = ref('')
const content_json = ref({})

const dialog = ref(false)

const handleSubmit = async () => {
     try { 
        const response = await axios.post('http://localhost:3000/api/projects', 
        { 
            project_id: project_id.value, 
            type: type.value, 
            status: status.value, 
            owner_user_id: owner_user_id.value,
            content_json: content_json.value,
            completed_at: completed_at.value
        }) 
        console.log('Proyecto creado:', response.data) 
        router.push('/starter')
    } catch (error) 
    { 
        console.error('Error al crear proyecto:', error.response?.data || error.message) 
    } 
}

const saveContentJson = () => {
    dialog.value = false;
    console.log("Saved content_json:", content_json.value);
}

const openDialog = () => {
  // reinicia el objeto según el type seleccionado
  switch (type) {
    case "Strategic alignment":
      content_json.value = {
        transformation: "",
        supported_decisions: [],
        measurable_success: [{ metric: "", target: "" }],
        out_of_scope: []
      };
      break;
    case "Big picture":
      content_json.value = {
        ecosystem_vision: "",
        impacted_domains: [],
        success_definition: ""
      };
      break;
    case "Domain breakdown":
      content_json.value = {
        domains: [{ name: "", objective: "", owner_user_id: "" }]
      };
      break;
    case "System Architecture":
      content_json.value = {
        auth_model: "",
        api_style: "",
        data_model_notes: "",
        scalability_notes: ""
      };
      break;
    case "Phase Scope":
      content_json.value = {
        included_modules: [],
        excluded_items: [],
        acceptance_criteria: []
      };
      break;
    default:
      content_json.value = {};
  }
  dialog.value = true;
}

</script>

<template>
    <v-row >
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Proyect ID</v-label>
            <VTextField  
            type="text" 
            placeholder="123456" 
            hide-details 
            v-model="project_id"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Type</v-label>
            <v-select
                :items="typeArtifact"
                v-model="type"
                label="Select Type"
                hide-details
            />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Status</v-label>
                <v-select
                :items="statusArtifact"
                v-model="status"
                label="Select Status"
                hide-details
            />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Owner User ID</v-label>
            <VTextField  
            type="text" 
            placeholder="U-001" 
            hide-details
            v-model="owner_user_id"
            ></VTextField>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Complete at</v-label>
            <VTextField  
            type="text" 
            placeholder="2026-03-03" 
            hide-details
            v-model="completed_at"
            ></VTextField>
        </v-col>
        <v-col cols="3">
            <v-btn color="primary" @click="openDialog()">
                Add Content JSON
            </v-btn>
        </v-col>
        
        <!-- Dialog dinámico -->
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

        <v-col cols="3">
            <v-btn @click="handleSubmit" color="primary" flat>Create Artifact</v-btn>
        </v-col>
        <v-col cols="1">
            <v-btn @click="router.push('/')" color="primary" flat>Cancel</v-btn>
        </v-col>
    </v-row>
</template>
