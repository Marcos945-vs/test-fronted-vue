<script setup>
import { computed, onBeforeMount } from 'vue';
import artifactsTreeView from '@/components/treeViews/artifactsTreeView.vue';
import modulesTreeView from '@/components/treeViews/modulesTreeView.vue';
import projectTreeView from '@/components/treeViews/projectTreeView.vue';
import { typeArtifact } from '@/enum/enum';

const props = defineProps({
    treeData: Object
});
onBeforeMount(() => {
    console.log('Tree data received in AuditTreeView:', props.treeData);
});
const entityData = computed(() => props.treeData?.after_json || props.treeData?.before_json);

const artifactTreeData = computed(() => ({
    content: entityData.value,
    title: entityData.value?.type || 'N/A'
}));
</script>

<template>
    <v-row v-if="treeData">
        <v-col class="d-flex justify-center" cols="6">
            <h3 class="text-h6 font-weight-bold">Before</h3>
            <artifactsTreeView
                v-if="props.treeData.before_json && props.treeData.entity_type === 'artifact'"
                :treeData="{ content: props.treeData.before_json, title: typeArtifact.find(t => t.value === props.treeData.before_json.type)?.title || 'N/A' }"
            />
            <modulesTreeView
                v-else-if="props.treeData.before_json && props.treeData.entity_type === 'module'"
                :treeData="props.treeData.before_json"
            />
            <projectTreeView
                v-else-if="props.treeData.before_json && props.treeData.entity_type === 'project'"
                :treeData="props.treeData.before_json" />
        </v-col>
        <v-col class="d-flex justify-center" cols="6">
            <h3 class="text-h6 font-weight-bold">After</h3>
            <artifactsTreeView
                v-if="props.treeData.after_json && props.treeData.entity_type === 'artifact'"
                :treeData="{ content: props.treeData.after_json, title: typeArtifact.find(t => t.value === props.treeData.after_json.type)?.title || 'N/A' }"
            />
            <modulesTreeView
                v-else-if="props.treeData.after_json && props.treeData.entity_type === 'module'"
                :treeData="props.treeData.after_json"
            />
            <projectTreeView
                v-else-if="props.treeData.after_json && props.treeData.entity_type === 'project'"
                :treeData="props.treeData.after_json" />
        </v-col>
        <!-- <modulesTreeView
            v-else-if="props.treeData.entity_type === 'module' || props.treeData.entity_type === 'project'"
            :treeData="entityData"
        /> -->
    </v-row>
</template>