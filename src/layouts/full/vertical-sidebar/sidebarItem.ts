import {
    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MoodSmileIcon,
    StarIcon,
    AwardIcon,
    Home2Icon
  } from 'vue-tabler-icons';

import { useSelectedStore } from '@/stores/selectedItems';
import { ModulesItems } from '@/_mockApis/dataTable';
import { computed } from 'vue';

const selectedStore = useSelectedStore();


import type { FunctionalComponent } from 'vue';

type TablerIconComponent = FunctionalComponent<any>;

type SidebarModuleItem =
  | { title: string; icon: TablerIconComponent }
  | { header: string };

const modules = computed(() => {
  if (selectedStore.project) {
    return selectedStore.project.modules.map(id => {
      const module = ModulesItems.find(m => m.id === id);
      return module ? { 
        ...module, 
        objective: module.objective 
      } : null;
    }).filter(Boolean); // elimina los null si no se encuentra el módulo
  }
  return [];
});

export const sidebarModule = computed<SidebarModuleItem[]>(() => {
  if (selectedStore.project) {
    let modulesList: SidebarModuleItem[] = [
      { header: 'Modules' },
      ...modules.value
        .map(m => m ? { title: m.objective, icon: CircleIcon } : null)
        .filter(Boolean) as { title: string; icon: TablerIconComponent }[]
    ];
    console.log('sidebarModule:', modulesList);
    return modulesList;
  }
  return [];
});



  export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
  }
  
 export const sidebarItem = [
    { header: 'Home' },
    {
            title: 'List Project',
            icon: CircleIcon,
            to: '/TableProject'
    },
    {
            title: 'List Module',
            icon: CircleIcon,
            to: '/TableModule'
    },
    {
            title: 'Artifact',
            icon: BrandChromeIcon,
            to: '#',
            children: [
                {
                    title: 'List Artifact',
                    icon: CircleIcon,
                    to: '/TableArtifact'
                },
                {
                    title: 'New Artifact',
                    icon: CircleIcon,
                    to: '/FormArtifact'
                }
            ]
        },
        
];

export const sidebarArtifact = [
    { header: 'Project name' },
    {
        title: 'Strategic Alignment',
        icon: CircleIcon,
        to: 'strategic_alignment'
    },{
        title: 'Big Picture',
        icon: CircleIcon,
        to: 'big_picture'
    },{
        title: 'Domain Breakdown',
        icon: CircleIcon,
        to: 'domain_breakdown'
    },{
        title: 'Module Matrix',
        icon: CircleIcon,
        to: 'module_matrix'
    },{
        title: 'Module Engineering',
        icon: CircleIcon,
        to: 'module_engineering'
    },{
        title: 'System Architecture',
        icon: CircleIcon,
        to: 'system_architecture'
    },{
        title: 'Phase Scope',
        icon: CircleIcon,
        to: 'phase_scope'
    },
];

