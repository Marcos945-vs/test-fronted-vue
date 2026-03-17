import { defineStore } from 'pinia';
import { router } from '@/router';

export const useSelectedStore = defineStore('select',{

    state: () => ({
    project: null as { 
      name: string; 
      client: string; 
      created: string; 
      status: string 
    } | null,
    artifact: 'Strategic alignment' as string | null,
    module: null as string | null,
  }),
  actions: {
    selectProject(project: { name: string; client: string; created: string; status: string }) {
      this.project = project;
      router.push(`/DetailsProject/${project.name}`);
    },
    selectArtifact(artifact: string) {
      this.artifact = artifact;
    },
    selectModule(module: string) {
      this.module = module;
    }
  }
});
