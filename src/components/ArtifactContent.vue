<script setup lang="ts">
import { ArtifactItems } from '@/_mockApis/dataTable'
import { computed } from 'vue'
import { useSelectedStore } from '@/stores/selectedItems';

const selectedStore = useSelectedStore()

// Filtrar los artefactos según el tipo recibido
const filteredArtifacts = computed(() =>
  ArtifactItems.filter(item => item.type === selectedStore.artifact)
)
</script>

<template>
  <h2 class="mb-4">{{ selectedStore.artifact }}</h2>

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
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
h2 {
  font-weight: bold;
  color: #3f51b5;
}
</style>
