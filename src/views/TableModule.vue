<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ModulesItems, ModuleHeaders } from '@/_mockApis/dataTable';
import { useSelectedStore } from '@/stores/selectedItems';

const router = useRouter();
const selectedStore = useSelectedStore();

const page = ref({ title: 'List Module' });
const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '/'
    },
    {
        text: 'List Modules',
        disabled: true,
        href: '#'
    }
]);

const search = ref();
const editDialog = ref(false);
const selectedModule = ref({});
const modules = ref([...ModulesItems]);


// Funciones
function openEditDialog(item) {
  selectedModule.value = { ...item };
  editDialog.value = true;
}

function saveEdit() {
  if (!selectedModule.value) return;
  const index = modules.value.findIndex(m => m.id === selectedModule.value.id);
  if (index !== -1) {
    modules.value[index] = { ...selectedModule.value };
  }
  editDialog.value = false;
}

function deleteModule(item) {
  modules.value = modules.value.filter(m => m.id !== item.id);
}

const goToDetail = (item) => {
  selectedStore.selectModule(item.id);
  router.push(`/DetailsModule/${item.id}`);
};
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Modules">
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
                    <v-btn to="/FormModule">
                    New Module
                    </v-btn>
                </v-col>
                </v-row>
                <v-data-table 
                items-per-page="5" 
                :headers="ModuleHeaders"  
                :items="modules" 
                :search="search"
                class="border rounded-md"
                >
                <!-- Columna de acciones -->
                <template v-slot:item.actions="{ item }">
                    <v-btn icon size="30" color="success" class="mr-1" @click="openEditDialog(item)">
                        <v-icon style="font-size: 15px;">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon size="30" color="error" class="mr-1" @click="deleteModule(item)">
                        <v-icon style="font-size: 15px;">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon size="30" color="primary" @click="goToDetail(item)">
                        <v-icon style="font-size: 15px;">mdi-magnify</v-icon>
                    </v-btn>
                </template>
                </v-data-table>

                <!-- Dialog to edit Module -->
                <v-dialog v-model="editDialog" max-width="600">
                <v-card>
                    <v-card-title>Edit Module</v-card-title>
                    <v-card-text>
                    <v-text-field 
                        label="Objective" 
                        v-model="selectedModule.objective" 
                    />

                    <v-combobox
                        v-model="selectedModule.inputs"
                        label="Inputs"
                        multiple
                        chips
                        clearable
                        placeholder="Add inputs"
                    />

                    <v-combobox
                        v-model="selectedModule.outputs"
                        label="Outputs"
                        multiple
                        chips
                        clearable
                        placeholder="Add outputs"
                    />

                    <v-text-field 
                        label="Responsibility" 
                        v-model="selectedModule.responsibility" 
                    />

                    <v-combobox
                        v-model="selectedModule.dependencies"
                        label="Dependencies"
                        multiple
                        chips
                        clearable
                        placeholder="Add dependencies"
                    />

                    <v-text-field 
                        label="Version Note" 
                        v-model="selectedModule.version_note" 
                    />
                    <v-text-field 
                    label="Data Structure" 
                    v-model="selectedModule.dataStructure" 
                    />

                    <v-text-field 
                    label="Logic Rules" 
                    v-model="selectedModule.logicRules" 
                    />

                    <v-text-field 
                    label="Failure Scenarios" 
                    v-model="selectedModule.failureScenarios" 
                    />

                    <v-text-field 
                    label="Audit Trail Requirements" 
                    v-model="selectedModule.auditTrailRequirements" 
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

