<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useSelectedStore } from '@/stores/selectedItems';
import { sidebarArtifact, sidebarItem, sidebarModule } from './sidebarItem';
import { ModulesItems } from '@/_mockApis/dataTable';

import NavItem from './NavItem/index.vue';
import NavItemSelectArtifact from './NavItem/select.vue';
import NavItemSelectModule from './NavItem/select2.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import NavGroup from './NavGroup/index.vue';
import { useAuthStore } from '@/stores/auth';
import UpgradeBox from '../vertical-header/UpgradeBox.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItem);
const authStore = useAuthStore();
const selectedStore = useSelectedStore();
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="87"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="270"
    >
        <!-- Aqui va el logo o el user -->
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar" style="height: 100%">
            <v-sheet rounded="md" width="360" elevation="10" class="pb-0" style="height: 64px;">
                <div class="px-4 pt-1 pb-0">
                    <div class="d-flex align-center mt-2 pb-0">
                        <v-avatar size="40">
                            <img src="@/assets/images/profile/user-1.jpg" width="40" />
                        </v-avatar>
                        <div class="ml-2 d-flex flex-column" v-if="!customizer.mini_sidebar">
                            <strong>{{ authStore.user.firstName || 'Unknown' }}</strong>
                            <span class="text-subtitle-1 font-weight-regular textSecondary">Administrator</span>
                        </div>
                    </div>
                </div>
            </v-sheet>
            <v-list class="py-4 pa-6">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <NavItem :item="item" v-else class="leftPadding" />
                </template>
            </v-list>
            <v-list class="py-4 pa-6">
                <template v-if="route.name === 'DetailsProject'" v-for="(item, i) in sidebarArtifact">
                    <NavGroup :item="{ header: selectedStore.project?.name }" v-if="item.header" :key="item.title" />
                    <NavItemSelectArtifact :item="item" v-else class="leftPadding" />
                </template>
                <template v-if="route.name === 'DetailsProject'" v-for="(item, i) in sidebarModule">
                    <NavGroup :item="{ header: item.header }" v-if="item.header" />
                    <NavItemSelectModule :item="item" v-else class="leftPadding" />
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
