<script setup>
import { ref } from 'vue'
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import ModuleContent from '@/components/ModuleContent.vue';
import { useSelectedStore } from '@/stores/selectedItems';

const selectedStore = useSelectedStore()

const page = ref({ title: "Details Module" });
const breadcrumbs = ref([
  { text: "Home", disabled: false, href: "/" },
  { text: "List Modules", disabled: false, href: "/TableModule" },
  { text: "Details Module", disabled: true, href: "#" },
]);

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Details">
        <ModuleContent />
        <v-card-actions>
            <v-btn color="primary" @click="selectedStore.assignModuleToProject()">
                Assign to {{ selectedStore.project ? selectedStore.project.name : 'Project' }}
            </v-btn>
            <v-btn @click="$router.back()">Back</v-btn>
        </v-card-actions>
        <span v-if="selectedStore.msg">{{ selectedStore.msg }}</span>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

