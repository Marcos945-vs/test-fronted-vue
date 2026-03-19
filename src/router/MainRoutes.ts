import { useSelectedStore } from '@/stores/selectedItems';
import { ComponentsIcon } from 'vue-tabler-icons';

const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Starter',
            path: '/',
            component: () => import('@/views/StarterPage.vue')
        },
        {
            name: 'FormProject',
            path: '/FormProject',
            component: () => import('@/views/FormProject.vue')
        },
        {
            name: 'FormArtifact',
            path: '/FormArtifact',
            component: () => import('@/views/FormArtifact.vue')
        },
        {
            name: 'FormModule',
            path: '/FormModule',
            component: () => import('@/views/FormModule.vue')
        },
        {
            name: 'TableProject',
            path: '/TableProject',
            component: () => import('@/views/TableProject.vue')
        },
        {
            name: 'TablerAtifact',
            path: '/TableArtifact',
            component: () => import('@/views/TableArtifact.vue')
        },
        {
            name: 'TableModule',
            path: '/TableModule',
            component: () => import('@/views/TableModule.vue')
        },
        {
            name: 'DetailsProject',
            path: '/DetailsProject/:projectName',
            component: () => import('@/views/DetailsProject.vue'),
            beforeEnter: () => {
                const selectedStore = useSelectedStore();
                if (!selectedStore.project) {
                // redirige si no hay proyecto cargado
                return '/TableProject';
                }
                return true; // permite continuar
            }
        },
        {
            name: 'DetailsModule',
            path: '/DetailsModule/:id',
            component: () => import('@/views/DetailsModule.vue'),
            beforeEnter: () => {
                const selectedStore = useSelectedStore();
                if (!selectedStore.module) {
                // redirige si no hay modulo cargado
                return '/TableModule';
                }
                return true; // permite continuar
            }
        },
        {
            name: 'Audit',
            path: '/Audit',
            component: () => import('@/views/Audit.vue')
        }

    ]
};

export default MainRoutes;
