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
        title: 'Strategic alignment',
        icon: CircleIcon,
    },{
        title: 'Big picture',
        icon: CircleIcon,
    },{
        title: 'Domain breakdown',
        icon: CircleIcon,
    },{
        title: 'Module Matrix',
        icon: CircleIcon,
    },{
        title: 'Module Engineering',
        icon: CircleIcon,
    },{
        title: 'System Architecture',
        icon: CircleIcon,
    },{
        title: 'Phase Scope',
        icon: CircleIcon,
    },
];
