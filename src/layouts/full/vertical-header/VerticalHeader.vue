<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { ActivityIcon, Menu2Icon} from 'vue-tabler-icons';
import ProfileDD from './ProfileDD.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';
import ThemeToggler from './ThemeToggler.vue';
import { AuditEvents } from '@/_mockApis/dataTable'

const customizer = useCustomizerStore();
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, (newPriority) => {
    priority.value = newPriority;
});


</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="64" color="containerBg" id="top">
        <v-btn
            class=" custom-hover-primary"
            icon
            size="small"
            color="primary"
            variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
        >
            <Menu2Icon size="20" />
        </v-btn>
        
        <v-spacer />
        
        <ThemeToggler />

        <div class="ms-2">
            <v-btn icon variant="text" color="primary" class="custom-hover-primary" to="/Audit" size="small">
                <v-badge
                v-if="AuditEvents.length > 0"
                color="secondary"
                :content="AuditEvents.length"
                offset-x="-4"
                offset-y="-3"
                >
                <ActivityIcon stroke-width="1.5" size="22" />
                </v-badge>

                <!-- Cuando no hay eventos, se muestra solo el icono -->
                <ActivityIcon
                v-else
                stroke-width="1.5"
                size="22"
                />
            </v-btn>
        </div>

        
        <!-- Notification -->
        <!-- ---------------------------------------------- -->
        
        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
         <!-- right sidebar -->
        

        <div class="ml-2">
            <ProfileDD />
        </div>
    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!-- Right Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>
