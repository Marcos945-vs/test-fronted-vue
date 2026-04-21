import { useSelectedStore } from '@/stores/selectedItems';
import { hasAccess } from '@/utils/helpers/hasAccess';
import { ComponentsIcon } from 'vue-tabler-icons';

const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        /* {
            name: 'Starter',
            path: '/',
            component: () => import('@/views/StarterPage.vue')
        }, */
        {
            name: 'FormProject',
            path: '/FormProject',
            component: () => import('@/views/FormProject.vue'),
            beforeEnter: () => {
                if (!hasAccess('edit_projects')) return '/';
                return true;
            }
        },
        {
            name: 'FormUser',
            path: '/FormUser',
            component: () => import('@/views/FormUser.vue'),
            beforeEnter: () => {
                if (!hasAccess('edit_users')) return '/';
                return true;
            }
        },
        {
            name: 'FormArtifact',
            path: '/DetailsProject/FormArtifact',
            component: () => import('@/views/FormArtifact.vue'),
            beforeEnter: () => {
                if (!hasAccess('edit_artifact')) return '/';
                return true;
            }
        },
        {
            name: 'FormModule',
            path: '/FormModule',
            component: () => import('@/views/FormModule.vue'),
            beforeEnter: () => {
                if (!hasAccess('edit_modules')) return '/';
                return true;
            }
        },
        {
            name: 'TableProject',
            path: '/',
            component: () => import('@/views/TableProject.vue'),
        },
        {
            name: 'TableUsers',
            path: '/TableUsers',
            component: () => import('@/views/TableUsers.vue'),
            beforeEnter: () => {
                if (!hasAccess('edit_users')) return '/';
                return true;
            }
        },
        {
            name: 'TableArtifact',
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
            path: '/DetailsProject/:projectName/:name',
            component: () => import('@/views/DetailsProject.vue'),
            beforeEnter: () => {
                const selectedStore = useSelectedStore();
                /* console.log('Selected project in route guard:', selectedStore.project);
                console.log('Selected artifact in route guard:', selectedStore.artifact); */
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
