<script setup lang="ts">
import { ArtifactItems } from '@/_mockApis/dataTable'
import { computed, ref } from 'vue'
import { useSelectedStore } from '@/stores/selectedItems';

const selectedStore = useSelectedStore()

// Filtrar los artefactos según el tipo recibido
const filteredArtifacts = computed(() =>
  ArtifactItems.filter(item => item.type === selectedStore.artifact)
)

const dialog = ref(false);
const selectedJson = ref({});

const editDialog = ref(false);
const selectedArtifact = ref({});

// Funciones
function openEditDialog(item: any) {
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
  <h2 class="text-h6 mb-4">{{ selectedStore.artifact }}</h2>

  <v-row
    v-for="item in filteredArtifacts"
    :key="item.project_id"
    class="mb-4"
  >
    <v-col cols="12">
      <v-card elevation="3" rounded="lg" class="pa-4">
        <!-- Cabecera del proyecto -->
        <v-card-title class="d-flex justify-start align-center">
          <span class="text-h6 font-weight-bold mr-2">Project ID: {{ item.project_id }}</span>
          <v-chip
            :color="item.status === 'completed' ? 'green' : 'blue'"
            text-color="white"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </v-card-title>
        <v-card-subtitle class="mb-2">
          Owner: <strong>{{ item.owner }}</strong>
          <span v-if="item.completed_at" class="ml-4">
            Completed at: {{ item.completed_at }}
          </span>
        </v-card-subtitle>

        <!-- Contenido dinámico -->
        <v-card-text>
          <div v-if="item.type === 'Strategic alignment'">
            <p><strong>Transformation:</strong> {{ item.content_json.transformation }}</p>
            <p v-if="Array.isArray(item.content_json.supported_decisions)">
              <strong>Supported decisions:</strong>
              <v-chip-group>
                <v-chip
                  v-for="d in item.content_json.supported_decisions"
                  :key="d"
                  color="primary"
                  text-color="white"
                  size="small"
                  class="ma-1"
                >
                  {{ d }}
                </v-chip>
              </v-chip-group>
            </p>
            <p><strong>Measurable success:</strong></p>
            <v-list density="compact">
              <v-list-item
                v-for="m in item.content_json.measurable_success"
                :key="m.metric"
              >
                <v-list-item-title>{{ m.metric }} → {{ m.target }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <p v-if="Array.isArray(item.content_json.out_of_scope)">
              <strong>Out of scope:</strong> {{ item.content_json.out_of_scope.join(', ') }}
            </p>
          </div>

          <div v-else-if="item.type === 'Big picture'">
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
              <v-list-item
                v-for="d in item.content_json.domains"
                :key="d.name"
              >
                <v-list-item-title>
                  {{ d.name }} → {{ d.objective }} (Owner: {{ d.owner_user_id }})
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <div v-else-if="item.type === 'Module Matrix' || item.type === 'Module Engineering'">
            <p><strong>Modules overview:</strong></p>
            <v-list density="compact">
              <v-list-item
                v-for="mod in item.content_json.modules_overview"
                :key="mod.name"
              >
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
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="openDialog(filteredArtifacts)">Update</v-btn>
        </v-card-actions>
      </v-card>
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
    </v-col>
  </v-row>
</template>

<style scoped>
h2 {
  font-weight: bold;
  color: #3f51b5;
}
</style>
