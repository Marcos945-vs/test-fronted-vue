<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import ArtifactContent from '@/components/ArtifactContent.vue';
import ArtifactNoContent from '@/components/ArtifactNoContent.vue';
import ModuleContent from '@/components/ModuleContent.vue';
import { useSelectedStore } from '@/stores/selectedItems';
import { ArtifactItems } from '@/_mockApis/dataTable';

const selectedStore = useSelectedStore()

const page = ref({ title: "Details Projects" });
const breadcrumbs = ref([
  { text: "Home", disabled: false, href: "/" },
  { text: "List Projects", disabled: false, href: "/TableProject" },
  { text: "Details Projects", disabled: true, href: "#" },
]);

const project = selectedStore.project;

const filteredArtifacts = computed(() =>
  ArtifactItems.filter(item => item.type === selectedStore.artifact)
)

const selectExist = computed(() => {
  if(filteredArtifacts.value.length === 0) return false;
  return true;
});

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
        <UiParentCard title="Details">
            <v-card-title class="d-flex justify-start align-center">
            <h2 class="font-weight-bold">{{ project.name }}</h2>
            <v-chip
                :color="project.status === 'completed' ? 'green' : 'blue'"
                text-color="white"
                size="small"
                class="ml-2"
            >
                {{ project.status }}
            </v-chip>
            </v-card-title>

            <!-- Contenido -->
            <v-card-text>
            <p>
                <strong>Client Name:</strong> {{ project.client }}
            </p>
            <p>
                <strong>Created by:</strong> {{ project.created }}
            </p>
            </v-card-text>
            <v-row>
                <v-col>
                    <v-card   class="mt-4 pa-2">
                        <ArtifactContent v-if="selectedStore.selectData ==='artifact' && selectExist" />
                        <ArtifactNoContent v-else-if="selectedStore.selectData ==='artifact' && !selectExist" />
                        <ModuleContent v-else-if="selectedStore.selectData ==='module'"/>
                    </v-card>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-btn @click="$router.back()">Back</v-btn>
            </v-card-actions>
        </UiParentCard>
        </v-col>
    </v-row>
</template>

<style scoped>
h2 {
  font-weight: bold;
  color: #3f51b5;
}
</style>