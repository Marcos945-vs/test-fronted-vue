import { defineStore } from 'pinia';
import { router } from '@/router';

export const useSelectedStore = defineStore('select',{

    state: () => ({
    project: null as { 
      name: string; 
      client: string; 
      created: string; 
      status: string;
      modules: number[]
    } | null,
    artifact: 'Strategic alignment' as string | null,
    module: null as number | null,
    msg: 'feo' as string | null,
  }),
  actions: {
    selectProject(project: { name: string; client: string; created: string; status: string; modules?: number[] }) {
    this.project = {
      ...project,
      modules: project.modules ?? []
    }
    router.push(`/DetailsProject/${project.name}`);
    },
    selectArtifact(artifact: string) {
      this.artifact = artifact;
    },
    selectModule(module: number) {
      this.module = module;
    },
    assignModuleToProject() {
      if (this.module && this.project && !this.project.modules.includes(this.module)) {
        this.project.modules.push(this.module)
        this.msg = `Module assigned to ${this.project?.name}`
      } else {
        this.msg = 'There must be a project selected to assign this module'
      }
    }
  }
});
