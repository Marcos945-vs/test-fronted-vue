<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useSelectedStore } from '@/stores/selectedItems';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { statusModule } from '@/enum/enum';
import FormCompModule from './form/FormCompModule.vue';
import { ModulesItems } from '@/_mockApis/dataTable';
import ModulesTreeView from './treeViews/modulesTreeView.vue';

const router = useRouter();
const selectedStore = useSelectedStore();
const authStore = useAuthStore();
const dialog = ref(false);
const loading_save = ref(false);
const form_module = ref(null);

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
        <ModulesTreeView :treeData="selectedStore.module.content" />
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
