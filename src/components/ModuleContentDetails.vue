<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSelectedStore } from '@/stores/selectedItems';
import { ModulesItems } from '@/_mockApis/dataTable';

const selectedStore = useSelectedStore()

const module = computed((item) => 
    ModulesItems.find(m => m.id === selectedStore.module),
);

</script>

<template>
<v-card-title class="d-flex justify-start align-center">
    <h2 class="text-h6 font-weight-bold">Module: {{ module.id }}</h2>
    <v-chip
    text-color="white"
    size="small"
    class="ml-2"
    >
    {{ module.objective }}
    </v-chip>
</v-card-title>

<!-- Contenido -->
<v-card-text>
    <p><strong>Inputs:</strong></p>
<v-chip-group column>
    <v-chip
    v-for="(input, i) in module.inputs"
    :key="'input-' + i"
    color="blue"
    text-color="white"
    class="ma-1"
    size="small"
    >
    {{ input }}
    </v-chip>
</v-chip-group>

<p><strong>Outputs:</strong></p>
<v-chip-group column>
    <v-chip
    v-for="(output, i) in module.outputs"
    :key="'output-' + i"
    color="green"
    text-color="white"
    class="ma-1"
    size="small"
    >
    {{ output }}
    </v-chip>
</v-chip-group>
    <p><strong>Responsibility:</strong> {{ module.responsibility }}</p>
    <p><strong>Failure Scenarios:</strong> {{ module.failure_scenarios }}</p>
    <p><strong>Audit Trail Requirements:</strong> {{ module.audit_trail_requirements }}</p>
    <p v-if="module.dependencies"><strong>Dependencies:</strong></p>
<v-chip-group column>
    <v-chip
    v-for="(dep, i) in module.dependencies"
    :key="'dep-' + i"
    color="purple"
    text-color="white"
    class="ma-1"
    size="small"
    >
    {{ dep }}
    </v-chip>
</v-chip-group>
    <p><strong>Version Note:</strong> {{ module.version_note }}</p>
</v-card-text>


</template>

<style scoped>
h2 {
  font-weight: bold;
  color: #3f51b5;
}
</style>
