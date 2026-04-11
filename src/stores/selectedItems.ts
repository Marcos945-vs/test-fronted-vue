import { defineStore } from 'pinia';
import { router } from '@/router';

const STORAGE_KEY = 'selectedStore';

function loadFromSession() {
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function saveToSession(state: object) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const useSelectedStore = defineStore('select', {
    state: () => {
        const saved = loadFromSession();
        return {
            project: (saved?.project ?? null) as {
                id: number;
                name: string;
                client: string;
                created_by: string;
                status: string;
                modules: [];
            } | null,
            artifact: (saved?.artifact ?? {
                title: 'Strategic Alignment',
                url: 'strategic_alignment',
                content: null
            }) as any,
            module: (saved?.module ?? null) as any,
            msg: '' as string | null,
            selectData: (saved?.selectData ?? 'artifact') as string | null
        };
    },
    actions: {
        selectProject(project: {id: number; name: string; client: string; created_by: string; status: string; modules?: [] }) {
            this.project = {
                ...project,
                modules: project.modules ?? []
            };
            saveToSession(this.$state);
            router.push(`/DetailsProject/${this.project?.name}/${this.artifact.url}`);
        },
        selectArtifact(artifact: { title: string; to: string }) {
            console.log('Selected artifact:', artifact);
            this.artifact.title = artifact.title;
            this.artifact.url = artifact.to;
            saveToSession(this.$state);
            router.push(`/DetailsProject/${this.project?.name}/${this.artifact.url}`);
        },
        selectModule(module: number) {
            this.module = module;
            saveToSession(this.$state);
        },
        assignModuleToProject() {
            if (this.module && this.project && !this.project.modules.includes(this.module)) {
                this.project.modules.push(this.module);
                this.msg = `Module assigned to ${this.project?.name}`;
                saveToSession(this.$state);
            } else {
                this.msg = 'There must be a project selected to assign this module';
            }
        }
    }
});
