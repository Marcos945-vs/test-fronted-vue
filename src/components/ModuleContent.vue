<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useSelectedStore } from '@/stores/selectedItems';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { statusModule } from '@/enum/enum';
import FormCompModule from './form/FormCompModule.vue';
import { ModulesItems } from '@/_mockApis/dataTable';

const router = useRouter();
const selectedStore = useSelectedStore();
const authStore = useAuthStore();
const dialog = ref(false);
const loading_save = ref(false);
const form_module = ref(null);

const treeItems = computed(() => {
    if (!selectedStore.module) return [];
    const module = selectedStore.module;
    const items = [];
    //console.log('Computing tree items for module:', module); 
    if (module.content.objective) {
        items.push({
            id: 'objective',
            title: 'Objective',
            children: [{ id: 'objective-val', title: module.content.objective }]
        });
    }
    if (module.content.inputs && module.content.inputs.length > 0) {
        items.push({
            id: 'inputs',
            title: 'Inputs',
            children: module.content.inputs.map((input, i) => ({ id: `input-${i}`, title: input }))
        });
    }
    if (module.content.data_structure && module.content.data_structure.length > 0) {
        items.push({
            id: 'data',
            title: 'Data Structure',
            children: module.content.data_structure.map((data, i) => ({ id: `data-${i}`, title: data }))
        });
    }
    if (module.content.logic_rules) {
        items.push({
            id: 'logic',
            title: 'Logic Rules',
            children: [{ id: 'logic-val', title: module.content.logic_rules }]
        });
    }
    if (module.content.outputs && module.content.outputs.length > 0) {
        items.push({
            id: 'outputs',
            title: 'Outputs',
            children: module.content.outputs.map((output, i) => ({ id: `output-${i}`, title: output }))
        });
    }
    if (module.content.responsibility) {
        items.push({
            id: 'responsibility',
            title: 'Responsibility',
            children: [{ id: 'responsibility-val', title: module.content.responsibility }]
        });
    }
    if (module.content.failure_scenarios) {
        items.push({
            id: 'failure',
            title: 'Failure Scenarios',
            children: [{ id: 'failure-val', title: module.content.failure_scenarios }]
        });
    }
    if (module.content.audit_trail_requirements) {
        items.push({
            id: 'audit',
            title: 'Audit Trail Requirements',
            children: [{ id: 'audit-val', title: module.content.audit_trail_requirements }]
        });
    }
    if (Array.isArray(module.content.dependencies) && module.content.dependencies.length > 0) {
        items.push({
            id: 'dependencies',
            title: 'Dependencies',
            children: module.content.dependencies.map((dep, i) => ({ id: `dep-${i}`, title: dep.name }))
        });
    }
    if (module.content.version_note) {
        items.push({
            id: 'version',
            title: 'Version Note',
            children: [{ id: 'version-val', title: module.content.version_note }]
        });
    }
    if (module.content.phase) {
        items.push({
            id: 'phase',
            title: 'Phase',
            children: [{ id: 'phase-val', title: module.content.phase }]
        });
    }
    if (module.content.priority) {
        items.push({
            id: 'priority',
            title: 'Priority',
            children: [{ id: 'priority-val', title: module.content.priority }]
        });
    }
    //console.log('Tree items for module:', items);
    return items;
});
onMounted(() => {
    //console.log('Selected module in content:', selectedStore.module);
    //console.log('ModulesItems:', ModulesItems);
});
const save = async () => {
    loading_save.value = true;
    if (selectedStore.module) {
        const is_done = await form_module.value.handleSubmit();
        if (!is_done) {
            loading_save.value = false;
            return;
        }
    }
    loading_save.value = false;
    dialog.value = false;
};
</script>

<template>
    <v-card-title class="d-flex justify-start align-center">
        <h2 class="text-h6 font-weight-bold">Module: {{ selectedStore.module.content.name }}</h2>
        <!-- <v-chip
    text-color="white"
    size="small"
    class="ml-2"
    >
    {{ selectedStore.module.objective }}
    </v-chip> -->
    </v-card-title>
    <v-card-subtitle>
        <p>
            Status: <strong>{{ selectedStore.module.content.status }}</strong>
        </p>
        <p>
            Domain: <strong>{{ selectedStore.module.content.domain.name }}</strong>
        </p>
    </v-card-subtitle>

    <!-- Contenido -->
    <v-card-text>
        <v-treeview :items="treeItems" item-children="children" item-title="title" item-value="id" open-all color="primary">
            <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children" size="small">mdi-arrow-right-thick</v-icon>
                <!-- <v-icon v-else size="small">mdi-folder-outline</v-icon> -->
            </template>
        </v-treeview>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
        <v-btn @click="$router.back()">Back</v-btn>
        <v-btn v-if="authStore.user.user.roles[0].name == 'admin' || authStore.user.abilities.includes('edit_modules')" color="primary" flat @click="dialog = true">Update Module</v-btn>
        <!-- <v-btn color="error" flat @click="">Delete Module</v-btn> -->
    </v-card-actions>
    <!-- Dialog to update the module -->
    <v-dialog persistent v-model="dialog" max-width="800">
                <v-card>
                    <v-card-title></v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-select
                                :items="statusModule"
                                v-model="selectedStore.module.content.status"
                                label="Select Status"
                            />
                        </v-col>
                        <FormCompModule ref="form_module" />
                    </v-card-text>
                    <v-card-actions>
                        <!-- <v-btn @click="openDialogJson(selectedArtifact)">Json</v-btn> -->
                        <v-btn @click="dialog = false">Close</v-btn>
                        <v-btn :loading="loading_save" @click="save()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
</template>

<style scoped>
h2 {
    font-weight: bold;
    color: #3f51b5;
}
</style>
