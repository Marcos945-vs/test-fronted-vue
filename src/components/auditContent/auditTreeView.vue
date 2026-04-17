<script setup>
import { computed } from 'vue';

const props = defineProps({
    treeData: Object
});
const treeItems = computed(() => {
    if (!treeData.content) return [];
    const after_content = props.treeData.after_json;
    const before_content = props.treeData.before_json;
    const type = props.treeData.type;

    if (type === 'artifact'){
        
    }
});
</script>
<template>

</template>